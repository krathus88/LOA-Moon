import time
from django.core.cache import cache
from django.http import JsonResponse


class RateLimitMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        # Configuration

        rate_limit_5min = 125
        rate_limit_1min = 30  # Maximum number of requests
        time_window_5min = 300
        time_window_1min = 60  # Time window in seconds

        client_ip = self.get_client_ip(request)
        # Cache keys for both windows
        cache_key_1min = f"rl:1min:{client_ip}"
        cache_key_5min = f"rl:5min:{client_ip}"

        # Get the current request counts and the time of the first request for both windows
        request_data_1min = cache.get(cache_key_1min)
        request_data_5min = cache.get(cache_key_5min)

        # Handle the 1-minute window
        if request_data_1min:
            request_count_1min, first_request_time_1min = request_data_1min
        else:
            request_count_1min, first_request_time_1min = 0, time.time()

        time_elapsed_1min = time.time() - first_request_time_1min

        # check 1 minute window
        if time_elapsed_1min < time_window_1min:
            if request_count_1min >= rate_limit_1min:
                return JsonResponse({"error": "Rate limit exceeded"}, status=429)
            else:
                cache.set(
                    cache_key_1min,
                    (request_count_1min + 1, first_request_time_1min),
                    timeout=time_window_1min,
                )
        else:
            # Reset the counter if the time window has passed
            cache.set(cache_key_1min, (1, time.time()), timeout=time_window_1min)

        # Handle the 5-minute window
        if request_data_5min:
            request_count_5min, first_request_time_5min = request_data_5min
        else:
            request_count_5min, first_request_time_5min = 0, time.time()

        time_elapsed_5min = time.time() - first_request_time_5min

        # check 5 minute window
        if time_elapsed_5min < time_window_5min:
            if request_count_5min >= rate_limit_5min:
                return JsonResponse({"error": "Rate limit exceeded"}, status=429)
            else:
                cache.set(
                    cache_key_5min,
                    (request_count_5min + 1, first_request_time_5min),
                    timeout=time_window_5min,
                )
        else:
            # Reset the counter if the time window has passed
            cache.set(cache_key_5min, (1, time.time()), timeout=time_window_5min)

        return self.get_response(request)

    def get_client_ip(self, request):
        x_forwarded_for = request.META.get("HTTP_X_FORWARDED_FOR")
        if x_forwarded_for:
            ip = x_forwarded_for.split(",")[0]
        else:
            ip = request.META.get("REMOTE_ADDR")
        return ip

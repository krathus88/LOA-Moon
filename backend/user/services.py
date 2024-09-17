from .models import Profile, Characters


def format_user_characters(profile: Profile):
    """Formats Characters for User in order to be sent to Frontend"""
    characters_data = []

    characters: Characters = profile.characters.all()

    # Print each character's details
    for character in characters:
        characters_data.append(
            {
                "region": character.region,
                "name": character.name,
                "class_id": character.class_id,
                "display_name": character.display_name,
            }
        )

    return characters_data

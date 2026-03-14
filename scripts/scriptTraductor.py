from googletrans import Translator

def translate_text(text, dest_language='es'):
    translator = Translator()
    translated = translator.translate(text, dest=dest_language)
    return translated.text

# Example usage
text_to_translate = "Arrows are used with a weapon that has the ammunition property to make a ranged attack. Each time you attack with the weapon, you expend one piece of ammunition. Drawing the ammunition from a quiver, case, or other container is part of the attack (you need a free hand to load a one-handed weapon). At the end of the battle, you can recover half your expended ammunition by taking a minute to search the battlefield."
translated_text = translate_text(text_to_translate)
print("Translated text:", translated_text)
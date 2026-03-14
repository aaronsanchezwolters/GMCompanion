import json
import re
import requests


f = open('Itemsdnd.json', encoding="utf8")

data = json.load(f)

success_count = 0
warning_count = 0

print("start processing")

for i in data['data']:
    try:

        description = re.sub(r'<[^>]*>', '', i['description'])
        slit_description = description.split("\n")
        clean_description = "".join(slit_description)

        request = {
            "name" : i['name'],
            "type" : i['type'],
            "description" : clean_description,
            "rarity" : i['rarity'],
            "image" : i.get("largeAvatarUrl", ""),
            "tags" : i.get("tags", ""),
            "weight" : i.get("weight", "0"),
            "cost" : i.get("cost", "0"),
            "filtertype" : i.get("filterType", "")
        }
    
        response = requests.post('http://localhost:5000/items', json=request)
        
        if response.status_code > 200: 
            warning_count = warning_count + 1
        else:
            success_count = success_count + 1

    except Exception as e:
        print(f"error : {e}")

print(f"success count {success_count}")

print(f"error count {warning_count}")

print(f"total count {success_count + warning_count}")

f.close()
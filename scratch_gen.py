import json
import os

def generate():
    with open('vijay_all_speeches_complete.json', 'r') as f:
        data = json.load(f)
    
    speeches = data['speeches']
    
    news_data_entries = []
    translations_ta = []
    translations_en = []
    
    # Existing assets pool for images
    image_pool = [
        "vikravandiBg", "panaiyurBg", "educationBg", "membershipBg", 
        "campaignTourBg", "roadshowBg", "maduraiBg", "trichyBg", 
        "coimbatoreBg", "registrationBg", "antiDrugBg", "mamallapuramBg", 
        "newYearBg", "velloreBg", "candidateIntroBg", "kanyakumariBg",
        "manifestoReleaseBg", "finalAppealBg"
    ]
    
    for i, s in enumerate(speeches):
        id_val = i  # New IDs
        date = s['date']
        location_raw = s['location']
        # Split location if it has / or ,
        loc_parts = location_raw.replace('/', ', ').split(',')
        loc_primary = loc_parts[0].strip()
        
        # Get youtube ID
        yt_id = ""
        if s.get('youtube_urls') and len(s['youtube_urls']) > 0:
            url = s['youtube_urls'][0]
            if "v=" in url:
                yt_id = url.split("v=")[1].split("&")[0]
        
        # Image rotation
        image = image_pool[i % len(image_pool)]
        
        # newsData entry
        entry = f"""  {{
    id: {id_val},
    tag: "{s['event_type']}",
    image: {image},
    category: "Campaign",
    location: "{loc_primary}",
    locationEn: "{loc_primary}",
    sortDate: "{date}",
    youtubeId: "{yt_id}"
  }}"""
        news_data_entries.append(entry)
        
        # Translations entries
        desc = s['description'].replace('"', '\\"')
        
        ta_entry = f"""      item{id_val + 1}: {{
        title: "{s['event_type']} - {loc_primary}",
        date: "{date}",
        content: "{desc}",
        sourceUrl: "{s['youtube_urls'][0] if s.get('youtube_urls') and len(s['youtube_urls']) > 0 else ''}"
      }}"""
        translations_ta.append(ta_entry)
        
        en_entry = f"""      item{id_val + 1}: {{
        title: "{s['event_type']} - {loc_primary}",
        date: "{date}",
        content: "{desc}",
        sourceUrl: "{s['youtube_urls'][0] if s.get('youtube_urls') and len(s['youtube_urls']) > 0 else ''}"
      }}"""
        translations_en.append(en_entry)

    scratch_dir = "/Users/VIJAYRAMESH/.gemini/antigravity/brain/fccd4e8f-677e-47ef-9f10-aa061780f6ff/scratch"
    os.makedirs(scratch_dir, exist_ok=True)

    with open(os.path.join(scratch_dir, 'newsData_new.js'), 'w') as f:
        f.write("export const newsData = [\n" + ",\n".join(news_data_entries) + "\n];")
        
    with open(os.path.join(scratch_dir, 'translations_news_ta.txt'), 'w') as f:
        f.write(",\n".join(translations_ta))

    with open(os.path.join(scratch_dir, 'translations_news_en.txt'), 'w') as f:
        f.write(",\n".join(translations_en))

generate()

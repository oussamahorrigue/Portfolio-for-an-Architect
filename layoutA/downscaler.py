import os
import PIL
from PIL import Image

directory = os.fsencode("input/")
    
for file in os.listdir(directory):
    filename = os.fsdecode(file)
    print(filename)
    dirc = "input/" + filename
    img = Image.open(dirc)
    basewidth = 1220
    baseheight = 1298
    wpercent= 0.75
    hsize = 1283
    img = img.resize((basewidth, hsize), PIL.Image.ANTIALIAS)
    dirc = "output/" + filename
    img.save(dirc)

print("Done")

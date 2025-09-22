import requests

#api key
token = "49c2146024156e70b8b3fe2aba9bd659aa6d503b" 

#url to get results from the api 
url = "https://api.waqi.info/search/"

#make get request with parameters to get montreal data
response = requests.get(url, params={"token": token, "keyword": "montreal"})

#get request as a json
results = response.json()

#print results
print(results)

#get the type of the results variable, which returns a dictionary(<class 'dict'>) when running the code
print(type(results))

#get the keys of the results variable, which returns dict_keys(['status', 'data']) when running the code
print(results.keys())

#get access the content associated with the data field. Save the result from the expression as a variable called responseData. 
responseData = results['data']

# Then find out the type of responseData, which returns a list (<class 'list'>) when running the code.
print(type(responseData))

# Iterate through responseData and print each item in the list.
for item in responseData:
 print(item)

#What does each item in the list represent? 
# Each item in the list represents a dictionary containing all the information of a specific location's air quality in Montreal.

#Write code to determine the type of the item variable, which returns a dictionary (<class 'dict'>) when running the code.
print(type(item))

# Write the code to determine the keys associated with the item variable
print(item.keys())
#dict_keys(['uid', 'aqi', 'time', 'station'])

#Modify the code above to now print out the name of each station from the responseData. Document the results.
print("Names of each station:")
for item in responseData:
 print(item['station']['name'])
#Montreal
#Ontario, Montreal, Canada
#Échangeur Décarie, Montreal, Canada
#Caserne 17, Montreal, Canada
#Saint-Michel, Montreal, Canada
#Hochelaga-Maisonneuve, Montreal, Canada
#Molson, Montreal, Canada
#Jardin Botanique, Montreal, Canada
#Parc Pilon, Montreal, Canada
#Maisonneuve, Montreal, Canada
#Drummond, Montreal, Canada
#St-Dominique, Montreal, Canada
#Roberval, York, Montreal, Canada
#Verdun, Montreal, Canada
#Duncan, Montreal, Canada
#Anjou, Montreal, Canada
#Dorval, Montreal, Canada
#Chénier, Montreal, Canada
#Saint-Jean-Baptiste, Montreal, Canada
#Aéroport de Montréal, Montreal, Canada
#Sainte-Anne-de-Bellevue, Montreal, Canada

#Append the code above to also print out the geolocations of each station from the responseData. 
print("Geolocations of each station:")
for item in responseData:
    print("lat:", item['station']['geo'][0])
    print("long:", item['station']['geo'][1])

#lat: 45.5086699
#long: -73.5539925
#lat: 45.52055
#long: -73.563222
#lat: 45.502648
#long: -73.663913
#lat: 45.593325
#long: -73.637328
#lat: 45.563697
#long: -73.610447
#lat: 45.539928
#long: -73.540388
#lat: 45.542767
#long: -73.572039
#lat: 45.56221
#long: -73.571785
#lat: 45.594576
#long: -73.641535
#lat: 45.501531
#long: -73.574311
#lat: 45.497859
#long: -73.573035
#lat: 45.512189
#long: -73.566842
#lat: 45.464611
#long: -73.582583
#lat: 45.472854
#long: -73.57296
#lat: 45.4660102
#long: -73.6336838
#lat: 45.602846
#long: -73.558874
#lat: 45.439119
#long: -73.7333
#lat: 45.60176
#long: -73.541992
#lat: 45.641026
#long: -73.499682
#lat: 45.468297
#long: -73.741185
#lat: 45.426509
#long: -73.928944

#Append the code above to print out the air quality index for each item AND the uid for each item.
print("Air Quality Index and UID for each station:")
for item in responseData:
    print("Station Name:", item['station']['name'])
    print("Latitude:", item['station']['geo'][0])
    print("Longitude:", item['station']['geo'][1])
    print("Air Quality Index:", item['aqi'])
    print("UID:", item['uid'])
    print("---------------------------")

#---------------------------
#Station Name: Échangeur Décarie, Montreal, Canada
#Latitude: 45.502648
#Longitude: -73.663913
#Air Quality Index: 30
#UID: 8595
#---------------------------
#Station Name: Roberval, York, Montreal, Canada
#Latitude: 45.464611
#Longitude: -73.582583
#Air Quality Index: 30
#UID: 10716
#---------------------------
#Station Name: Ontario, Montreal, Canada
#Latitude: 45.52055
#Longitude: -73.563222
#Air Quality Index: 30
#UID: 8628
#---------------------------
#Station Name: Caserne 17, Montreal, Canada
#Latitude: 45.593325
#Longitude: -73.637328
#Air Quality Index: 30
#UID: 5461
#---------------------------
#Station Name: Saint-Michel, Montreal, Canada
#Latitude: 45.563697
#Longitude: -73.610447
#Air Quality Index: 27
#UID: 8696
#---------------------------
#Station Name: Molson, Montreal, Canada
#Latitude: 45.542767
#Longitude: -73.572039
#Air Quality Index: 24
#UID: 5467
#---------------------------
#Station Name: Hochelaga-Maisonneuve, Montreal, Canada
#Latitude: 45.539928
#Longitude: -73.540388
#Air Quality Index: 24
#UID: 5463
#---------------------------
#Station Name: Parc Pilon, Montreal, Canada
#Latitude: 45.594576
#Longitude: -73.641535
#Air Quality Index: 22
#UID: 8596
#---------------------------
#Station Name: Maisonneuve, Montreal, Canada
#Latitude: 45.501531
#Longitude: -73.574311
#Air Quality Index: 22
#UID: 5465
#---------------------------
#Station Name: Drummond, Montreal, Canada
#Latitude: 45.497859
#Longitude: -73.573035
#Air Quality Index: 21
#UID: 8626
#---------------------------
#Station Name: St-Dominique, Montreal, Canada
#Latitude: 45.512189
#Longitude: -73.566842
#Air Quality Index: 20
#UID: 10138
#---------------------------
#Station Name: Jardin Botanique, Montreal, Canada
#Latitude: 45.56221
#Longitude: -73.571785
#Air Quality Index: 17
#UID: 8695
#---------------------------
#Station Name: Verdun, Montreal, Canada
#Latitude: 45.472854
#Longitude: -73.57296
#Air Quality Index: 12
#UID: 8594
#---------------------------
#Station Name: Duncan, Montreal, Canada
#Latitude: 45.4660102
#Longitude: -73.6336838
#Air Quality Index: -
#UID: 5462
#---------------------------
#Station Name: Anjou, Montreal, Canada
#Latitude: 45.602846
#Longitude: -73.558874
#Air Quality Index: 27
#UID: 8625
#---------------------------
#Station Name: Dorval, Montreal, Canada
#Latitude: 45.439119
#Longitude: -73.7333
#Air Quality Index: -
#UID: 8627
#---------------------------
#Station Name: Chénier, Montreal, Canada
#Latitude: 45.60176
#Longitude: -73.541992
#Air Quality Index: 30
#UID: 5460
#---------------------------
#Station Name: Saint-Jean-Baptiste, Montreal, Canada
#Latitude: 45.641026
#Longitude: -73.499682
#Air Quality Index: 27
#UID: 5459
#---------------------------
#Station Name: Aéroport de Montréal, Montreal, Canada
#Latitude: 45.468297
#Longitude: -73.741185
#Air Quality Index: 24
#UID: 5466
#---------------------------
#Station Name: Sainte-Anne-de-Bellevue, Montreal, Canada
#Latitude: 45.426509
#Longitude: -73.928944
#Air Quality Index: 30
#UID: 5468
#---------------------------


print("Data for a specific station:")
#url to get the data for a specific station.
url_feed = "https://api.waqi.info/feed/@5468"
#make get request with parameters to get montreal data
response_feed = requests.get(url_feed, params={"token": token})
#get request as a json
results_feed = response_feed.json()
print(results_feed)

#{'status': 'ok', 'data': {'aqi': 30, 'idx': 5468, 'attributions': [{'url': 'http://ville.montreal.qc.ca/portal/page?_pageid=7237,74495616&_dad=portal&_schema=PORTAL', 'name': "Ville de Montreal - Réseau de surveillance de la qualité de l'air", 'logo': 'Canada-Montreal.png'}, {'url': 'https://waqi.info/', 'name': 'World Air Quality Index Project'}, 'max': 45, 'min': 28}, {'avg': 46, 'day': '2025-09-23', 'max': 53, 'min': 38}, {'avg': 30, 'day': '2025-09-24', 'max': 54, 'min': 22}, {'avg': 22, 'day': '2025-09-25', 'max': 28, 'min': 12}, {'avg': 21, 'day': '2025-09-26', 'max': 34, 'min': 9}, {'avg': 42, 'day': '2025-09-27', 'max': 47, 'min': 29}], 'uvi': [{'avg': 0, 'day': '2025-09-21', 'max': 0, 'min': 0}, {'avg': 0, 'day': '2025-09-22', 'max': 4, 'min': 0}, {'avg': 0, 'day': '2025-09-23', 'max': 2, 'min': 0}, {'avg': 1, 'day': '2025-09-24', 'max': 5, 'min': 0}, {'avg': 0, 'day': '2025-09-25', 'max': 2, 'min': 0}, {'avg': 0, 'day': '2025-09-26', 'max': 3, 'min': 0}]}}, 'debug': {'sync': '2025-09-23T04:53:02+09:00'}}}


#write the code to access the content associated with the data field. Save the result from the expression as a variable called response_data_feed. 
print("Accessing the data field from the feed results:")
response_data_feed = results_feed['data']
print(type(response_data_feed))
#What id the type of this variable? <class 'dict'>

#Write a for loop to iterate through the `response_data_feed` variable
for key in response_data_feed.keys():
    print(f"{key}: {response_data_feed[key]}")

#aqi: 30
#idx: 5468
#attributions: [{'url': 'http://ville.montreal.qc.ca/portal/page?_pageid=7237,74495616&_dad=portal&_schema=PORTAL', 'name': "Ville de Montreal - Réseau de surveillance de la qualité de l'air", 'logo': 'Canada-Montreal.png'}, {'url': 'https://waqi.info/', 'name': 'World Air Quality Index Project'}]
#city: {'geo': [45.426509, -73.928944], 'name': 'Sainte-Anne-de-Bellevue, Montreal, Canada', 'url': 'https://aqicn.org/city/canada/montreal/sainte-anne-de-bellevue', 'location': ''}
#dominentpol: pm25
#iaqi: {'co': {'v': 6.4}, 'h': {'v': 75.1}, 'no2': {'v': 7.4}, 'o3': {'v': 22}, 'p': {'v': 1013.6}, 'pm25': {'v': 30}, 'so2': {'v': 5.1}, 't': {'v': 19.1}, 'w': {'v': 1}, 'wg': {'v': 1.3}}
#time: {'s': '2025-09-22 14:00:00', 'tz': '-04:00', 'v': 1758549600, 'iso': '2025-09-22T14:00:00-04:00'}
#forecast: {'daily': {'pm10': [{'avg': 6, 'day': '2025-09-20', 'max': 6, 'min': 5}, {'avg': 11, 'day': '2025-09-21', 'max': 17, 'min': 6}, {'avg': 11, 'day': '2025-09-22', 'max': 13, 'min': 9}, {'avg': 12, 'day': '2025-09-23', 'max': 15, 'min': 9}, {'avg': 9, 'day': '2025-09-24', 'max': 17, 'min': 7}, {'avg': 6, 'day': '2025-09-25', 'max': 9, 'min': 4}, {'avg': 6, 'day': '2025-09-26', 'max': 9, 'min': 3}, {'avg': 11, 'day': '2025-09-27', 'max': 12, 'min': 8}], 'pm25': [{'avg': 13, 'day': '2025-09-20', 'max': 13, 'min': 12}, {'avg': 36, 'day': '2025-09-21', 'max': 53, 'min': 13}, {'avg': 34, 'day': '2025-09-22', 'max': 45, 'min': 28}, {'avg': 46, 'day': '2025-09-23', 'max': 53, 'min': 38}, {'avg': 30, 'day': '2025-09-24', 'max': 54, 'min': 22}, {'avg': 22, 'day': '2025-09-25', 'max': 28, 'min': 12}, {'avg': 21, 'day': '2025-09-26', 'max': 34, 'min': 9}, {'avg': 42, 'day': '2025-09-27', 'max': 47, 'min': 29}], 'uvi': [{'avg': 0, 'day': '2025-09-21', 'max': 0, 'min': 0}, {'avg': 0, 'day': '2025-09-22', 'max': 4, 'min': 0}, {'avg': 0, 'day': '2025-09-23', 'max': 2, 'min': 0}, {'avg': 1, 'day': '2025-09-24', 'max': 5, 'min': 0}, {'avg': 0, 'day': '2025-09-25', 'max': 2, 'min': 0}, {'avg': 0, 'day': '2025-09-26', 'max': 3, 'min': 0}]}}
#debug: {'sync': '2025-09-23T04:53:02+09:00'}

#write the expression to access the aqi field and the dominentpolfield - according to the documentation what does this field represent? Save both values in new variables.
aqi_value = response_data_feed['aqi']
dominentpol_value = response_data_feed['dominentpol']
print(f"AQI: {aqi_value}, Dominent Pollutant: {dominentpol_value}")
#The dominentpol field represents the primary pollutant of the air quality index (AQI) at a given location.
#AQI: 30, Dominent Pollutant: pm25

#access you will access the iaqi field. You will see that the result is another dictionary, with keys for different pollutants. Each one of those keys—somewhat inexplicably—has another dictionary for its values, whose only key (`v`) points to the actual value for that pollutant.
iaqi_value = response_data_feed['iaqi']
print(type(iaqi_value))
#the result is a dictionary -> <class 'dict'>

#we want to use the value from the dominentpol field to access the actual value for that pollutant... (i.e. say the `dominentpol =so2') - how can we use the data from the iaqi field to access the actual value?
actual_value = iaqi_value[dominentpol_value]['v']
print(f"Actual value for {dominentpol_value}: {actual_value}")
#Actual value for pm25: 30

#explain theoretically (you do not have to write the code) what the process would be to access the value of the dominant pollutant value from different cities 
#To access the value of the dominant pollutant from different cities, follow these steps:
#1. Make a GET request to the API for the specific city using its unique identifier (e.g., @5468)
#2. Parse the JSON response to extract the 'data' field, which contains the air quality information.
#3. From the "data" field, retrieve the 'dominentpol' field to get the dominant pollutant.
#4. Access the "iaqi" field, which contains a dictionary of pollutants and their values.
#5. Use the value from the 'dominentpol' field to get the value in the 'iaqi' dictionary.

from django_pandas.io import read_frame
import pandas as pd
from sklearn.cluster import DBSCAN


# Query all locations, return locations with object cluster and user location with cluster info
# data is all locations serialized
def getContacts(user, query, data):
    #Social distance
    safe_distance = 0.0018288 #6 feets in kilometers
    # Create panda of locations for data analysis
    df = read_frame(query, fieldnames=['latitude', 'longitude', 'startTime', 'endTime', 'id'])
    #Apply model, in case of larger dataset or noisy one, increase min_samples
    model = DBSCAN(eps=safe_distance, min_samples=2, metric='haversine').fit(df[['latitude', 'longitude']])
    # Get clusters found by the algorithm convert to pandas and add column for index number
    dbscan_result = pd.DataFrame(model.labels_.tolist())
    dbscan_result["locations_id"] = df.get("id")
    # Get a dict whose keys are the cluster number and contains a list of your elements
    clusters = {}
    # Assign cluster id for each location and locations to each cluster
    for i,cluster_id in enumerate(dbscan_result[0]):
        data[i]["cluster_id"]= cluster_id
        if cluster_id in clusters:
            clusters[cluster_id].append(data[i])
        else:
            clusters[cluster_id] = []
            clusters[cluster_id].append(data[i])
    # Get user locations
    user_locations = list(filter(lambda location: location["owner"] == user.id, data))
    # Get the user intersections of a cluster
    for location in user_locations:
        # get locations that are in the same cluster
        list_locations_id = clusters[location["cluster_id"]]
        location["contacts"] = []
        for other_location in list_locations_id:
            # intercts
            if (location["startTime"] <=  other_location["endTime"] and location["endTime"] >=  other_location["startTime"] and location["id"]!=other_location["id"]
                and location["owner"] != other_location["owner"] ):
                    location["contacts"].append(other_location["id"])
    
    
    return user_locations
import pandas as pd
from pymongo import MongoClient
print("Reading csv...")
seat=pd.read_csv("Seats.csv")
seatPrice=pd.read_csv("SeatPricing.csv")

data=pd.merge(seat,seatPrice,on="seat_class",how="inner")
data["is_booked"] = [False]*data.shape[0]
data = data.drop(columns=["id_x", "id_y"]).to_dict(orient='records')
mongo = MongoClient("mongodb+srv://haritiwari442:cVy46VtGieeCFEXd@cluster0.wbgnnv6.mongodb.net")
print("Done...")

mydb = mongo["flurn"]
print("Uploading to database...")
mydb.seats.insert_many(data)
print("Done...")
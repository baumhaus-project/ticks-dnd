from api.requests import post

tickets = [
{
    "title":"Ticket A",
    "customer":"Customer A",
    "time_spent": 120,
    "active": True,
    "status":"OPEN"
},
{
    "title":"Ticket B",
    "customer":"Customer B",
    "time_spent": 180,
    "active": True,
    "status":"OPEN"
},
{
    "title":"Ticket C",
    "customer":"Customer A",
    "time_spent": 60,
    "active": False,
    "status":"OPEN"
}
]

persons = [
    {
        "id": "d685d5ea-a076-4642-9a66-4178176bd0fd",
        "name": "Steffen"
    },
    {
        "id": "38fbb97a-cc16-45a0-a822-8ad189e3e2c2",
        "name": "Bastian"
    }
]


for ticket in tickets:
    p = post(ticket, "tickets")
    if (p["status"]==201):
        print("Ticket:", ticket["title"], "posted successfully", p["status"])
        continue
    print("Ticket:", ticket["title"], "post FAILED", p["status"])

for person in persons:
    p = post(person, "persons")
    if (p["status"]==201):
        print("Person:", person["name"], "posted successfully", p["status"])
        continue
    print("Person:", person["name"], "post FAILED", p["status"])

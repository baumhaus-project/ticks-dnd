from api.requests import post

tickets = [
{
    "title":"Ticket A",
    "customer":"Customer A",
    "assignee": 0,
    "time_spent": 120,
    "active": True
},
{
    "title":"Ticket B",
    "customer":"Customer B",
    "assignee": 1,
    "time_spent": 180,
    "active": True
},
{
    "title":"Ticket C",
    "customer":"Customer A",
    "assignee": 0,
    "time_spent": 60,
    "active": False
}
]

persons = [
    {
        "name": "Steffen"
    },
    {
        "name": "Bastian"
    }
]


for ticket in tickets:
    p = post(ticket, "tickets")
    # if (p["status"]=="200"):
    #     print("Ticket:", ticket["title"], "posted successfully", p["status"])
    #     continue
    # print("Ticket:", ticket["title"], "post FAILED", p["status"])

for person in persons:
    p = post(person, "persons")
    # if (p["status"]=="200"):
    #     print("Person:", person["name"], "posted successfully", p["status"])
    #     continue
    # print("Person:", person["name"], "post FAILED", p["status"])

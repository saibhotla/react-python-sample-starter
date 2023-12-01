import csv
import random
import string
import faker

data = []
fake = faker.Faker()
for _ in range(100):
    name = fake.name()
    address = fake.address()
    phone_number = fake.phone_number()
    age = random.randint(18, 80)

    data.append([name, address, phone_number, age])

with open('c:/Projects/PythonDev/aicreations/project_1/sample.csv', 'w', newline='') as file:
    writer = csv.writer(file)
    writer.writerow(['Name', 'Address', 'Phone Number', 'Age'])
    writer.writerows(data)

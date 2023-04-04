# Web Engineering Technical Test

This test involves retrieving, processing and displaying data related to rainfall across a number of regions. The goal of this test is to evaluate your technical expertise and problem solving skills.

The entire test is expected to take around 2 hours. If you have any questions, please let us know — we'd rather you asked than got stuck.

## Setup

We’ve built a simple [Next.js](https://nextjs.org/) application as a boilerplate. You will need Node.js 14.6.0 or newer installed to get started.

## Task

You are building an application using React that displays data in a table format. The data will be fetched from an API endpoint and will need to be transformed. The user should be able to filter the data by region and also get total and average values. Your task is the following:

- Fetch the data from the API endpoint (the endpoint is `/api/rainfall`)
- Create a table that displays the data.
- Apply a filter that allows the user to filter data by region.
- Create a summary section that displays:
  - Total rainfall
  - Average rainfall
  - Number of consecutive days where rainfall exceeds 10mm

## Detailed requirements

- The table should display all the data in a tabular format with columns for region name and rainfall values at each date, for example: <img width="1432" alt="Screenshot 2023-01-12 at 14 02 57" src="https://user-images.githubusercontent.com/53346/212086920-231054d5-6c73-4def-b722-87c2938535c6.png">
- The filter should have a dropdown menu with a list of regions to choose from when selected it should filter the data

## Submission

When you're done please commit your code to a public GitHub repo. Send us an email with a link to the repo and let us know what you would have done next to improve the application if you had more time.


![example branch parameter](https://github.com/farhandroid/CounterApp/actions/workflows/CI_CD.yml/badge.svg?branch=master)
![Docker](https://img.shields.io/badge/-Docker-orange)  ![Docker](https://img.shields.io/badge/%20-Redux-blueviolet)

![Docker](https://img.shields.io/badge/-React-red) 


# CounterApp

[See more details about this in Medium](https://farhan-tanvir.medium.com/ci-cd-from-github-to-aws-ec2-using-github-action-e18b621c0507)


## To run in dev environment

### `docker-compose up -d --build`
Open [http://3.90.199.134:3001](http://3.90.199.134:3001) to view it in the browser.

## To run in production environment

### `docker-compose -f docker-compose.prod.yml up -d --build`
Open [http://3.90.199.134:8899](http://3.90.199.134:8899) to view it in the browser.
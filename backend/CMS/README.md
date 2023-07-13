# ✏️ Steps for running backend on development 
```code
1- cd backend/CMS
2- yarn
3- create a `.env` file and copy-paste the content of `.env.example` into it.
4- yarn develop
```
after these steps, the CMS should start running on port `1337` on your localhost <br>
So navigate to this URL <a href="http://localhost:1337">http://localhost:1337</a><br><br>

Then you will be asked to **create an account** or **login** to your existing account. So do it 😊<br>
Now you have your **Dashboard** like below: <br><br>
<img width="600" alt="Screenshot 2023-07-14 at 00 19 37" src="https://github.com/fatemehmarzoughi/MyPlayer/assets/48021528/ff4c5813-6f5a-4399-bbd3-7d99497c6900">
<br><br>

# 🔨 Configs
To avoid getting a 403 response error you need to follow this guide: <br>

1- navigate to **Settings => Rolls => Public**<br>
2- There you will find some collections of API permissions, <br>
3- You need to get permission accesses to all of them<br><br>
<img width="391" height="400" alt="Screenshot 2023-07-14 at 00 25 14" src="https://github.com/fatemehmarzoughi/MyPlayer/assets/48021528/89e2f3f6-50de-482d-9b66-3803c87fe2e1">
<br><br>
4- Do the same thing for **Settings => Rolls => Authenticated**

# 🍱 Add Data
Now if you want to add some data to the database and check the frontend part, then you should follow these steps<br><br>
1- Choose `Content Manager` from the left sidebar<br>
2- click on `Items`<br>
3- click on `create new entry`<br>
4- you will be shown a form in which you have to fill in the required contents and then click on the `save` and then `publish` buttons<br>
🎉 tada, you must now be able to see your item on the Home page of the MyPlayer app<br><br>
**As you must have noticed, there are other parts in the Content Manager, Here is a simple explanation of them:** <br>

1- **BugReport:** In this section we can we the users' bug reports. This API is connected inside the **Profile page => bug report**<br>
2- **Items:** All the Videos and Audios are stored in this API<br>
3- **Plan:** This section refers to the different Plans (Premium or Free) of the app<br>
4- **User:** Here you can find the list of registered users<br>
5- **Banner:** This is the banner which will display on the Home screen (You should choose this among the existing Audio and Videos)<br>

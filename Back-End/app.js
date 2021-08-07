const express = require('express')
const app = express()
const port = 3000 || process.env.PORT
const mongoose =require('mongoose');

var cors = require('cors')
//middleware
app.use(express.json());
app.use(cors());


//registeration && signIn
app.use(require('./routes/register.routes'));
app.use(require('./routes/signin.routes'));
app.get('/', (req, res) => {
    res.json({messege:'hi'})
});
// //resourse
// app.use(require('./routes/resourse/uploadresourse.routes'));
// app.use(require('./routes/resourse/deleteresourse.routes'));
// app.use(require('./routes/resourse/updateresourse.routes'));
// app.use(require('./routes/resourse/displayresourse.routes'));
// app.use(require('./routes/resourse/resoursedetails.routes'));

// //displayUploadedResourse
// app.use(require('./routes/user/displayUploadResourseUserID/displayuploadresourse.routes'));

// //addRegistertionCourse
// app.use(require('./routes/user/registertionCourses/addregistertioncourse.routes'))
// app.use(require('./routes/user/registertionCourses/deleteregistertioncourse.routes'))
// app.use(require('./routes/user/registertionCourses/displayregistertioncourse.routes'))

// //course
// app.use(require('./routes/course/addcourse.routes'));
// app.use(require('./routes/course/deletecourse.routes'));
// app.use(require('./routes/course/updatecourse.routes'));
// app.use(require('./routes/course/displaycourse.routes'));
// app.use(require('./routes/course/coursedetails.routes'));

// //displayUploadedCourse
// app.use(require('./routes/user/displayUploadCoursesUserID/displayuploadcourse.routes'));

// //addRegistertionResourse
// app.use(require('./routes/user/registertionResourses/addregistertionresourse.routes'))
// app.use(require('./routes/user/registertionResourses/deleteregistertionresourse.routes'))
// app.use(require('./routes/user/registertionResourses/displayregistertionresourse.routes'))

// //lesson
// app.use(require('./routes/lesson/addlesson.routes'));
// app.use(require('./routes/lesson/deletelesson.routes'));
// app.use(require('./routes/lesson/updatelesson.routes'));
// app.use(require('./routes/lesson/displaylesson.routes'));
// app.use(require('./routes/lesson/lessondetails.routes'));

// //file
// app.use(require('./routes/file/uploadfile.routes'));
// app.use(require('./routes/file/deletefile.routes'));
// app.use(require('./routes/file/updatefile.routes'));
// app.use(require('./routes/file/displayfile.routes'));
// app.use(require('./routes/file/filedetails.routes'));

// //home
// app.use(require('./routes/home/home.routes'));

// //accountSettings
// app.use(require('./routes/user/accountSettings/updateaccountsettings.routes'));
// app.use(require('./routes/user/accountSettings/updatepassword.routes'));
// app.use(require('./routes/user/accountSettings/displayaccountsettings.routes'));
// app.use(require('./routes/user/accountSettings/deletebioaccountsettings.routes'));
// app.use(require('./routes/user/accountSettings/deleteimage.routes'));


// //admin
// //notification
// app.use(require('./routes/admin/notification/notificationCourse.routes'));
// app.use(require('./routes/admin/notification/notificationResourse.routes'));
// app.use(require('./routes/admin/notification/notificationlesson.routes'));
// app.use(require('./routes/admin/notification/notificationfile.routes'));

// //insertNotification
// app.use(require('./routes/admin/notification/insertnotificationcourse.routes'));
// app.use(require('./routes/admin/notification/insertnotificationresourse.routes'));
// app.use(require('./routes/admin/notification/inesrtnotificationlesson.routes'));
// app.use(require('./routes/admin/notification/insertnotificationfile.routes'));
// //updateNotification
// app.use(require('./routes/admin/notification/updatenotification.routes'));
// app.use(require('./routes/admin/notification/updatenotificationlesson.routes'));
// app.use(require('./routes/admin/notification/updatenotificationfile.routes'));

// to connect node with DB..
mongoose.connect('mongodb+srv://admin:admin@shu.j3esi.mongodb.net/final_project', 
            {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify:false})
            .then(()=>{
                        console.log('DB connected');
});



app.listen(port, () => console.log(`Example app listening on port port!`))
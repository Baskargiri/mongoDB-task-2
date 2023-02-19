
// insert   users data 
 

db.users.insertMany([
    {
      user_id: 1,
      name: "baskar",
      mentor_id: 1,
    },
    {
      user_id: 2,
      name: "ashwath",
      mentor_id: 2,
    },
    {
      user_id: 3,
      name: "govaa",
      mentor_id: 3,
    },
    {
      user_id: 4,
      name: "sundar",
      mentor_id: 4,
    },
    {
      user_id: 5,
      name: "sri ram",
      mentor_id: 5,
    },
  ]);
  
  
// codekata data
db.codekata.insertMany([
    {
      user_id: 1,
      no_of_problems_solved: 75,
    },
    {
      user_id: 2,
      no_of_problems_solved: 20,
    },
    {
      user_id: 3,
      no_of_problems_solved: 88,
    },
    {
      user_id: 4,
      no_of_problems_solved: 56,
    },
    {
      user_id: 5,
      no_of_problems_solved: 101,
    },
  ]);
  
  
// attendance data
db.attendance.insertMany([
    {
      user_id: 1,
      topic_id: 1,
      present: true,
    },
    {
      user_id: 2,
      topic_id: 2,
      present: true,
    },
    {
      user_id: 3,
      topic_id: 3,
      present: false,
    },
    {
      user_id: 4,
      topic_id: 4,
      present: false,
    },
    {
      user_id: 5,
      topic_id: 5,
      present: true,
    },
  ]);
  
  
// topics data
db.topics.insertMany([
    {
      topic_id: 1,
      topic: "HTML",
      topic_date: new Date("2020-10-01"),
    },
    {
      topic_id: 2,
      topic: "CSS",
      topic_date: new Date("2020-10-10"),
    },
    {
      topic_id: 3,
      topic: "Javascript",
      topic_date: new Date("2020-10-15"),
    },
    {
      topic_id: 4,
      topic: "ReactJS",
      topic_date: new Date("2020-10-20"),
    },
    {
      topic_id: 5,
      topic: "NodeJS",
      topic_date: new Date("2020-10-25"),
    },
  ]);
  
  
// tasks details
db.tasks.insertMany([
    {
      task_id: 1,
      topic_id: 1,
      user_id: 1,
      task: "HTML task",
      due_date: new Date("2020-10-05"),
      submitted: true,
    },
    {
      task_id: 2,
      topic_id: 2,
      user_id: 2,
      task: "CSS task",
      due_date: new Date("2020-10-15"),
      submitted: true,
    },
    {
      task_id: 3,
      topic_id: 3,
      user_id: 3,
      task: "Javascript task",
      due_date: new Date("2020-10-20"),
      submitted: true,
    },
    {
      task_id: 4,
      topic_id: 4,
      user_id: 4,
      task: "ReactJS task",
      due_date: new Date("2020-10-25"),
      submitted: false,
    },
    {
      task_id: 5,
      topic_id: 5,
      user_id: 5,
      task: "NodeJS task",
      due_date: new Date("2020-10-30"),
      submitted: false,
    },
  ]);
  
  
// company_drives data
db.company_drives.insertMany([
    {
      user_id: 1,
      drive_date: new Date("2020-10-05"),
      company_name: "Google",
    },
    {
      user_id: 1,
      drive_date: new Date("2020-10-10"),
      company_name: "Amazon",
    },
    {
      user_id: 2,
      drive_date: new Date("2020-10-20"),
      company_name: "Microsoft",
    },
    {
      user_id: 3,
      drive_date: new Date("2020-10-15"),
      company_name: "Zoho",
    },
    {
      user_id: 5,
      drive_date: new Date("2020-10-30"),
      company_name: "Facebook",
    },
  ]);
  
  
// mentors details
db.mentors.insertMany([
    {
      mentor_id: 1,
      mentor_name: "Ragav",
      mentee_count: 35,
    },
    {
      mentor_id: 2,
      mentor_name: "kishore",
      mentee_count: 45,
    },
    {
      mentor_id: 3,
      mentor_name: "rupan kumar",
      mentee_count: 50,
    },
    {
      mentor_id: 4,
      mentor_name: "kishore",
      mentee_count: 22,
    },
    {
      mentor_id: 5,
      mentor_name: "anbu arasan",
      mentee_count: 42,
    },
  ]);


//queries



// 1. Find all the topics and tasks which are thought in the month of October.
db.topics.aggregate([
    {
        $lookup: {
               from: "tasks",
               localField: "topic_id",
               foreignField: "topic_id",
               as: "task_info"
             }
    },
    {
        $match:{$and:[{$or:[{topic_date:{$gt:new Date("2020-10-01")}},{topic_date:{$lt:new Date("2020-10-30")}}]},
        
          {$or:[{"task_info.due_date":{$gt:new Date("2020-10-01")}},{"task_info.due_date":{$lt:new Date("2020-10-30")}}]}
        ]}
    }
 ])


// 2. Find all the company drives which appeared between 15-oct-2020 and 31-oct-2020.
db.company_drives.find({
  $and: [
    { drive_date: { $lte: new Date("2020-10-31") } },
    { drive_date: { $gte: new Date("2020-10-15") } },
  ],
})


// 3. Find all the company drives and students who are appeared for the placement.
db.company_drives.aggregate([
    {
        $lookup: {
              from:"users",
              localField:"user_id",
              foreignField:"user_id",
              as :"user_info"
             }
    },
    {
        $project:{
            _id:0,
            "user_info.name":1,
            company_name:1,
            drive_date:1,
            "user_info.email":1,
            "user_info.user_id":1
        }
    }
])


// 4. Find the number of problems solved by the user in codekata.
db.codekata.aggregate([
    {
      $lookup: {
        from: "users",
        localField: "user_id",
        foreignField: "user_id",
        as: "user_info",
      },
    },
    {
      $project: {
        _id: 0,
        user_id: 1,
        "user_info.name": 1,
        "user_info.email": 1,
        no_of_problems_solved: 1,
      },
    },
])


// 5. Find all the mentors with who has the mentee's count more than 15.
db.mentors.find({
    mentee_count:{ $gt:15 }
})


// 6. Find the number of users who are absent and task is not submitted between 15 oct-2020 and 31-oct-2020


db.tasks.aggregate([
    {
      $lookup: {
        from: "attendance",
        localField: "user_id",
        foreignField: "user_id",
        as: "attendance",
      },
    },
    {
      $match: {
        $and: [{ submitted: false }, { "attendance.present": false }],
      },
    },
])
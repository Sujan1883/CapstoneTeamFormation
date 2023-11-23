const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const bcrypt = require('bcrypt');
const app = express();
const cors = require('cors'); // Import the CORS library
const port = 5000;

app.use(bodyParser.json());
app.use(cors()); // Use CORS middleware to enable cross-origin requests

// Create a MySQL connection
const connection = mysql.createConnection({
  host: 'localhost', // Replace with your MySQL server host
  user: 'root', // Replace with your MySQL username
  password: 'Sujansid@1828', // Replace with your MySQL password
  database: 'dbms', // Replace with your database name
});

// Connect to the MySQL database
connection.connect((err) => {
  if (err) {
    console.error('Error connecting to the database: ', err);
    return;
  }
  console.log('Connected to MySQL database');
});

app.get('/api/hasteam/:userid', (req, res) => {
  const userId = req.params.userid;
  const query = 'SELECT hasteam FROM users WHERE userid = ?';
  connection.query(query, [userId], (err, results) => {
    if (err) {
      console.error('Error fetching hasteam:', err);
      res.status(500).json({ success: false, message: 'An error occurred while fetching hasteam value.' });
    } else if (results.length > 0) {
      const hasteam = results[0].hasteam;
      res.json({ success: true, hasteam });
    } else {
      res.status(404).json({ success: false, message: 'User not found.' });
    }
  });
});


app.get('/', (req, res) => {
  res.send('Hello, World!');
});

app.get('/register', (req, res) => {
  res.send('Hello, World1!');
});

app.get('/login', (req, res) => {
  res.send('Hello, World2!');
});

app.post('/api/register', async (req, res) => {
  const { fullname, mobileNo, email, role, username, password, domain } = req.body;

  // Insert user data into the "users" table
  const insertUserQuery = 'INSERT INTO users (fullname, mobileNo, email, role, username, password) VALUES (?, ?, ?, ?, ?, ?)';
  const userValues = [fullname, mobileNo, email, role, username, password];

  // Insert user data into either the "students" or "faculty" table based on the role
  let insertRoleQuery;
  if (role === 'student') {
    insertRoleQuery = 'INSERT INTO students (fullname, mobileNo, email, username, password) VALUES (?, ?, ?, ?, ?)';
  } else if (role === 'faculty') {
    insertRoleQuery = 'INSERT INTO faculty (fullname, mobileNo, email, username, password, domain) VALUES (?, ?, ?, ?, ?, ?)';
  } else {
    return res.status(400).json({ success: false, message: 'Invalid role.' });
  }

  const roleValues = role === 'faculty' ? [fullname, mobileNo, email, username, password, domain] : [fullname, mobileNo, email, username, password];

  connection.beginTransaction(function (err) {
    if (err) {
      console.error('Error during registration:', err);
      res.status(500).json({ success: false, message: 'Registration failed.' });
      return;
    }

    connection.query(insertUserQuery, userValues, function (err, result) {
      if (err) {
        connection.rollback(function () {
          console.error('Error during registration:', err);
          res.status(500).json({ success: false, message: 'Registration failed.' });
        });
        return;
      }

      connection.query(insertRoleQuery, roleValues, function (err, result) {
        if (err) {
          connection.rollback(function () {
            console.error('Error during registration:', err);
            res.status(500).json({ success: false, message: 'Registration failed.' });
          });
          return;
        }

        connection.commit(function (err) {
          if (err) {
            connection.rollback(function () {
              console.error('Error during registration:', err);
              res.status(500).json({ success: false, message: 'Registration failed.' });
            });
            return;
          }

          res.json({ success: true, message: 'Registration successful.' });
        });
      });
    });
  });
});


// Login route
app.post('/api/login', (req, res) => {
  const { username, password } = req.body;

  // Check if the username and password match what is stored in the database
  const query = 'SELECT * FROM users WHERE username = ? AND password = ?';
  connection.query(query, [username, password], (err, results) => {
    if (err) {
      console.error('Error during login:', err);
      res.status(500).json({ success: false, message: 'An error occurred during login.' });
    } else if (results.length === 0) {
      res.status(401).json({ success: false, message: 'Invalid username or password.' });
    } else {
      res.json({ success: true, message: 'Login successful.' });
    }
  });
});

// Add a new route to fetch user information based on username
app.get('/api/user/:username', (req, res) => {
  const username = req.params.username;
  const query = 'SELECT userid, role, hasteam FROM users WHERE username = ?';

  connection.query(query, [username], (err, results) => {
    if (err) {
      console.error('Error fetching user data:', err);
      res.status(500).json({ success: false, message: 'An error occurred while fetching user data.' });
    } else if (results.length > 0) {
      const userData = results[0];
      res.json({ success: true, ...userData });
    } else {
      res.status(404).json({ success: false, message: 'User not found.' });
    }
  });
});

app.get('/api/fetchTeamInfo/:teamName', (req, res) => {
  console.log("Here");
  const teamname = req.params.teamName;
  const query = 'SELECT teamid, teamname, leadername FROM team WHERE teamname = ?';

  connection.query(query, [teamname], (err, results) => {
    if (err) {
      console.error('Error fetching user data:', err);
      res.status(500).json({ success: false, message: 'An error occurred while fetching user data.' });
    } else if (results.length > 0) {
      const userData = results[0];
      res.json({ success: true, ...userData });
    } else {
      res.status(404).json({ success: false, message: 'User not found.' });
    }
  });
}); //Added

app.get('/api/user/role/:username', (req, res) => {
  const username = req.params.username;
  // Replace with your actual database query to fetch the user's role
  // Example:
  const userRole = getUserRoleFromDatabase(username);
  if (userRole) {
    res.status(200).json({ role: userRole });
  } else {
    res.status(404).json({ error: 'User not found' });
  }
}); //Added

app.get('/api/publications', (req, res) => {
  // Define a query to select all publications from the 'publications' table
  const query = 'SELECT * FROM publications';

  // Execute the query
  connection.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching publications:', err);
      res.status(500).json({ success: false, message: 'An error occurred while fetching publications.' });
    } else {
      res.json({ success: true, publications: results });
    }
    console.log(results);
  });
});
app.get('/api/project', (req, res) => {
  // Define a query to select all publications from the 'publications' table
  const query = 'SELECT * FROM projects';

  // Execute the query
  connection.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching projects:', err);
      res.status(500).json({ success: false, message: 'An error occurred while fetching projects.' });
    } else {
      res.json({ success: true, projects: results });
    }
    //console.log(results);
  });
});
app.get('/api/faculty', (req, res) => {
  // Define a query to select faculty members from the 'faculty' table
  const query = 'SELECT * FROM faculty';

  // Execute the query
  connection.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching faculty members:', err);
      res.status(500).json({ success: false, message: 'An error occurred while fetching faculty members.' });
    } else {
      res.json({ success: true, facultyMembers: results });
    }
  });
});

app.get('/api/team', (req, res) => {
  // Define a query to select all teams from the 'teams' table
  const query = 'SELECT * FROM team';

  // Execute the query
  connection.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching team:', err);
      res.status(500).json({ success: false, message: 'An error occurred while fetching team.' });
    } else {
      res.json({ success: true, teams: results });
    }
  });
});
app.post('/api/createteam', (req, res) => {
  const { leadername, teamName, domain, members ,newMemberName} = req.body;
  console.log(leadername, teamName, domain, members,newMemberName );
  let s ='';
  let l = members.length;
  console.log("atring : ",s);
  console.log("members  "+members+" : "+l);
  console.log("MMMMMMMMMMMM",members);
  console.log("NMNMNMMMNMNMNM",newMemberName);
  console.log("newmembers  "+newMemberName);
  if(members.length>0)
     s = members.join(',') + ',' + newMemberName;
  else  
    s=newMemberName



  console.log("updated ",s);
  // Insert team data into the "team" table
  let noofslots = 4 - members.length-1;
  const insertTeamQuery = 'INSERT INTO team (teamname,noofslots,domain,leadername) VALUES (?,  ?, ?,?)';
  const teamValues = [teamName,noofslots,domain,leadername];

  connection.query(insertTeamQuery, teamValues, (err, result) => {
    if (err) {
      console.error('Error during team creation:', err);
      res.status(500).json({ success: false, message: 'Team creation failed.' });
    } else {
      res.json({ success: true, message: 'Team created successfully.' });
    }
  });
});

app.post('/api/facultyinvites', (req, res) => {
  const { facultyId, facultyName, domain, teamName, teamId } = req.body;
  const no="Not Accepted";
  // Insert faculty invitation data into the faculty_invites table
  const query = 'INSERT INTO faculty_invites (fac_id, fac_name, domain, team_id, teamname,status) VALUES (?, ?, ?, ?, ?,?)';
  const values = [facultyId, facultyName, domain, teamId, teamName,no];

  connection.query(query, values, (err, result) => {
    if (err) {
      console.error('Error during faculty invitation:', err);
      res.status(500).json({ success: false, message: 'Faculty invitation failed.' });
    } else {
      res.json({ success: true, message: 'Faculty invitation successful.' });
    }
  });
});


// Add this new endpoint to your server.js file
// ... (other imports and configurations)

app.get('/api/facultyinvites/:facID', (req, res) => {
  const facultyID = req.params.facID;

  // Replace the query with your actual database query to fetch faculty invites based on faculty name
  const query = 'SELECT * FROM faculty_invites WHERE fac_id = ? AND status ="Not Accepted"';

  connection.query(query, [facultyID], (err, results) => {
    if (err) {
      console.error('Error fetching faculty invites:', err);
      res.status(500).json({ success: false, message: 'An error occurred while fetching faculty invites.' });
    } else {
      res.json({ success: true, facultyInvites: results });
    }
  });
});

app.get('/api/faculty/:facName', (req, res) => {
  const facultyName = req.params.facName;

  // Replace the query with your actual database query to fetch faculty invites based on faculty name
  const query = 'SELECT fac_id FROM faculty WHERE fullname = ?';
  //console.log("here"+facultyName);
  connection.query(query, [facultyName], (err, results) => {
    if (err) {
      console.error('Error fetching faculty name:', err);
      res.status(500).json({ success: false, message: 'An error occurred while fetching faculty invites.' });
    } else {
      const userData = results[0];
      // console.log("Success");
      res.json({ success: true, ...userData });
      // console.log(results);
    }
  });
});

app.get('/api/facultyteams/:facId', (req, res) => {
  const { facId } = req.params;

  // Use the connection pool to execute a query
  connection.execute('SELECT * FROM faculty_invites WHERE fac_id = ? and status ="Accepted"', [facId], (error, results) => {
    if (error) {
      console.error('Error fetching faculty teams from the database:', error);
      res.json({ success: false, message: 'Error fetching faculty teams from the database' });
    } else {
      // Results will contain the rows returned from the query
      res.json({ success: true, facultyTeams: results });
    }
    console.log("resu:",results);
  });
});







app.post('/api/acceptFacultyInvite/:teamId', async(req, res) => {
  const teamId = req.params.teamId;

  console.log('Suc: '+teamId);
  // Assuming you have a stored procedure named CreateFacultyTeams
  const callProcedureQuery = 'CALL InsertFacultyTeams(?)';
  

  connection.query(callProcedureQuery, [teamId], function (err, result) {
    if (err) {
      console.error('Error calling stored procedure:', err);
      res.status(500).json({ success: false, message: 'Faculty invite acceptance failed.' });
      return;
    }

    // Assuming the stored procedure handles the insert and delete operations

    res.json({ success: true, message: 'Faculty invite accepted.' });
  });
});

app.post('/api/deleteFacultyInvite/:teamId', async (req, res) => {
  const { teamId } = req.params;

  try {
    // Execute logic to accept the faculty invite
    // You can include your trigger or stored procedure call here
    // ...

    // Now, delete the record in the faculty_invites table
    const deleteQuery = 'DELETE FROM faculty_invites WHERE team_id = ?';
    connection.query(deleteQuery, [teamId]);

    res.json({ success: true, message: 'Faculty invite accepted and record deleted.' });
  } catch (error) {
    console.error('Error accepting faculty invite:', error);
    res.status(500).json({ success: false, message: 'An error occurred while accepting faculty invite.' });
  }
});

app.put('/api/updateHasteam/:username', async (req, res) => {
  const { username } = req.params;
  console.log("U : "+username);
  try {
    // Update the 'hasteam' attribute for the user with the given 'username'
    // Perform the database update here
    // Example using SQL:

    // const q = "INSERT  "
    const updatequery='UPDATE users SET hasteam = 1 WHERE username = ? ';
    connection.query(updatequery, [username]);

    res.json({ success: true, message: 'hasteam attribute updated' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error updating hasteam attribute' });
  }
});


app.get(`/api/teaminvites/:teamLeader`, async (req, res) => {
  const { teamLeader } = req.params;
  console.log("teamlead:",teamLeader);
  //console.log("U : "+username);

    // Update the 'hasteam' attribute for the user with the given 'username'
    // Perform the database update here
    // Example using SQL:
    const query='SELECT student_id FROM students WHERE username = ? ';
    connection.query(query, [teamLeader], (err, results) => {
      if (err) {
        console.error('Error fetching leader id:', err);
        res.status(500).json({ success: false, message: 'An error occurred while fetching leader id.' });
      } else {
        const userData = results[0];
        // console.log("Success");
        res.json({ success: true, ...userData });
        // console.log(results);
      }
    });
});

app.post('/api/teaminvites', (req, res) => {
  const { leaderId,leaderName,memberName } = req.body;

  // Insert faculty invitation data into the faculty_invites table
  const query = 'INSERT INTO team_invites (leader_id, leader_name, member_name) VALUES (?, ?, ?)';
  const values = [leaderId, leaderName, memberName];

  connection.query(query, values, (err, result) => {
    if (err) {
      console.error('Error during insert team invitation:', err);
      res.status(500).json({ success: false, message: 'Insert Team invitation failed.' });
    } else {
      res.json({ success: true, message: 'Insert Team invitation successful.' });
    }
  });
});

app.get(`/api/teamfetch/:lName`, (req, res) => {
  const lead = req.params.lName;

  // Replace the query with your actual database query to fetch faculty invites based on faculty name
  const query = 'SELECT * FROM team_invites WHERE leader_name = ?';

  connection.query(query, [lead], (err, results) => {
    if (err) {
      console.error('Error fetching leader:', err);
      res.status(500).json({ success: false, message: 'An error occurred while fetching leader.' });
    } else {
      res.json({ success: true, teamFetch: results });
    }
  });
});

app.post('/api/fetchmemb/:lName', async(req, res) => {
  const lName = req.params.lName;

  // Assuming you have a stored procedure named CreateFacultyTeams
  const query = 'SELECT members from team where leadername=?';
  

  connection.query(query, [lName], function (err, results) {
    if (err) {
      console.error('Error fetching members:', err);
      res.status(500).json({ success: false, message: 'An error occurred while fetching members.' });
    } else {
      const userData = results[0];
      // console.log("Success");
      res.json({ success: true, ...userData });
      // console.log(results);
    }
  });
});

app.put('/api/updatememb/:lName', async (req, res) => {
  const { newMembers } = req.body;

  const { lName } = req.params;
  // console.log("U : "+username);
  try {
    // Update the 'hasteam' attribute for the user with the given 'username'
    // Perform the database update here
    // Example using SQL:
    const updatequery='UPDATE team SET members =? WHERE leadername = ? ';
    connection.query(updatequery,  [newMembers, lName]);

    res.json({ success: true, message: 'memb attribute updated' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error updating memb attribute' });
  }
});

app.post('/api/deleteRequest/:lName/:cur', (req, res) => {
  const leadname = req.params.lName;
  const stuname = req.params.cur;

  try {
    // Execute logic to accept the faculty invite
    // You can include your trigger or stored procedure call here
    // ...

    // Now, delete the record in the faculty_invites table
    const deleteQuery = 'DELETE FROM team_invites WHERE leader_name = ? AND member_name = ?';
    connection.query(deleteQuery, [leadname,stuname]);

    res.json({ success: true, message: 'Your Invite accepted and record deleted.' });
  } catch (error) {
    console.error('Error accepting your invite:', error);
    res.status(500).json({ success: false, message: 'An error occurred while accepting your invite.' });
  }
});

app.post(`/api/fetchTeamDet/:uName`,async(req, res) => {
  const UName = req.params.uName;

  // Assuming you have a stored procedure named CreateFacultyTeams
  const query = 'SELECT * FROM team where leadername=?';
  

  connection.query(query, [UName], function (err, results) {
    if (err) {
      console.error('Error fetching:', err);
      res.status(500).json({ success: false, message: 'An error occurred while fetching.' });
    } else {
      const userData = results[0];
      // console.log("Success");
      res.json({ success: true, ...userData });
      // console.log(results);
    }
  });
});

app.post(`/api/updateFacID/:teamId`, async (req, res) => {
  const { facid } = req.body;

  const { teamId } = req.params;
  // console.log("U : "+username);
  try {
    // Update the 'hasteam' attribute for the user with the given 'username'
    // Perform the database update here
    // Example using SQL:
    const updatequery='UPDATE team SET facultyid=? WHERE teamid=? ';
    connection.query(updatequery,  [facid, teamId]);

    res.json({ success: true, message: 'memb attribute updated' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error updating memb attribute' });
  }
});

app.get(`/api/fetchprofile/:lName`, (req, res) => {
  const use = req.params.lName;

  // Replace the query with your actual database query to fetch faculty invites based on faculty name
  const query = 'SELECT * FROM users WHERE username = ?';

  connection.query(query, [use], (err, results) => {
    if (err) {
      console.error('Error fetching user:', err);
      res.status(500).json({ success: false, message: 'An error occurred while fetching user.' });
    } else {
      res.json({ success: true, userFetch: results });
    }
    console.log(results);
  });
});

app.get(`/api/fetchteamdetails/:lName`, (req, res) => {
  const use = req.params.lName;

  // Replace the query with your actual database query to fetch faculty invites based on faculty name
  const query = 'SELECT * FROM team WHERE leadername = ?';

  connection.query(query, [use], (err, results) => {
    if (err) {
      console.error('Error fetching teamdetails:', err);
      res.status(500).json({ success: false, message: 'An error occurred while fetching teamdetails.' });
    } else {
      res.json({ success: true, userFetch: results });
    }
    console.log(results);
  });
});

app.get('/api/facultyidfetch/:facName',  (req, res) => {
  const facultyName = req.params.facName;

  // Replace the query with your actual database query to fetch faculty invites based on faculty name
  const query = 'SELECT fac_id FROM faculty WHERE fullname = ?';
  //console.log("here"+facultyName);
  connection.query(query, [facultyName], (err, results) => {
    if (err) {
      console.error('Error fetching faculty id:', err);
      res.status(500).json({ success: false, message: 'An error occurred while fetching faculty id.' });
    } else {
      const userData = results[0];
      // console.log("Success");
      res.json({ success: true, ...userData });
      // console.log(results);
    }
  });
});

app.get('/api/facultynav/:uname', async (req, res) => {
  // console.log("NAVBAR");
  const nam = req.params.uname;
    //console.log("NAVBAR    ",nam);
  try{
    
  //console.log("Uname : ",nam);
  // Replace the query with your actual database query to fetch faculty invites based on faculty name
  const query = 'SELECT role FROM users WHERE username = ?';
  //console.log("here"+facultyName);
  connection.query(query, [nam], (err, results) => {
    if (err) {
      console.error('Error fetching role:', err);
      res.status(500).json({ success: false, message: 'An error occurred while fetching role.' });
      console.log("error");
    } else {
      const userData = results[0];
      //console.log("GGEEGEG",userData);
      res.json({ success: true, ...userData });
      // console.log(results);
    }
  });
}
catch{
  console.log("ERROR");
}
});

app.post('/api/declineFacultyInvite/:teamId', (req, res) => {
  const tid= req.params.teamId;

  try {
    // Execute logic to accept the faculty invite
    // You can include your trigger or stored procedure call here
    // ...

    // Now, delete the record in the faculty_invites table
    const deleteQuery = 'DELETE FROM faculty_invites WHERE team_id = ?';
    connection.query(deleteQuery, [tid]);

    res.json({ success: true, message: 'Your Invite deletes and record deleted.' });
  } catch (error) {
    console.error('Error deleting your invite:', error);
    res.status(500).json({ success: false, message: 'An error occurred while deleting your invite.' });
  }
});

app.get(`/api/countteams/:id`, async (req, res) => {
  const cnt = req.params.id;

  try {
    // Execute logic to count the teams for the given faculty ID
    const countQuery = `
    SELECT COUNT(*) AS team_count 
    FROM faculty_invites 
    WHERE fac_id = (
      SELECT fac_id 
      FROM faculty 
      WHERE fullname = ? 
    )
    AND status = "Accepted"
  `;
    
    // Execute the query to get the count
    connection.query(countQuery, [cnt], (err, result) => {
      if (err) {
        console.error('Error counting your teams:', err);
        res.status(500).json({ success: false, message: 'An error occurred while counting your teams.' });
        return;
      }

      // Extract the count from the result
      const teamCount = result[0].team_count;

      // Send the count as a response
      res.json({ success: true, teamCount });
    });
  } catch (error) {
    console.error('Error counting your teams:', error);
    res.status(500).json({ success: false, message: 'An error occurred while counting your teams.' });
  }
});


// app.get('/api/fetchTeamInfo/:teamName', (req, res) => {
//   console.log("Here");
//   const teamname = req.params.teamName;
//   const query = 'SELECT teamid, teamname, leadername FROM team WHERE teamname = ?';

//   connection.query(query, [teamname], (err, results) => {
//     if (err) {
//       console.error('Error fetching user data:', err);
//       res.status(500).json({ success: false, message: 'An error occurred while fetching user data.' });
//     } else if (results.length > 0) {
//       const userData = results[0];
//       res.json({ success: true, ...userData });
//     } else {
//       res.status(404).json({ success: false, message: 'User not found.' });
//     }
//   });
// }); //Added

// ... (other routes)





/*app.get('/api/teams/:facID', (req, res) => {
  const facId = req.params.facID;

  // Replace the query with your actual database query to fetch teams based on faculty ID
  const query = 'SELECT * FROM team WHERE facultyid = ?';

  connection.query(query, [facId], (err, results) => {
    if (err) {
      console.error('Error fetching teams:', err);
      res.status(500).json({ success: false, message: 'An error occurred while fetching teams.' });
    } else {
      res.json({ success: true, teams: results });
    }
  });
});
*/

app.post('/api/teamInfo/:UName/:teamID', async (req, res) => {
  const Uname = req.params.UName;
  const teamID = req.params.teamID;

  try {
    // Call stored procedure to insert into team_info
    const callProcedure = 'CALL InsertTeamInfo(?, ?)';

    connection.query(callProcedure, [teamID, Uname], (error, results) => {
      if (error) {
        console.error('Error calling stored procedure:', error);
        res.status(500).json({ success: false, message: 'An error occurred while executing the stored procedure.' });
      } else {
        res.json({ success: true, message: 'Your invite was accepted and the record was inserted.' });
      }
    });
  } catch (error) {
    console.error('Error accepting your invite:', error);
    res.status(500).json({ success: false, message: 'An error occurred while accepting your invite.' });
  }
});

app.post(`/api/acceptInvite/:lName/:studentName`, async (req, res) => {
  const lName = req.params.lName;
  const mem =req.params.studentName;
  console.log("memmmmm: ",mem);
  try {
    // Fetch teamid and teamname based on leadername (lName)
    const nestedQuery = `
      INSERT INTO team_info (team_id, members, team_name)
      SELECT teamid, '${mem}' AS members, teamname
      FROM team
      WHERE leadername = '${lName}'
    `;

    connection.query(nestedQuery, (error, results) => {
      if (error) {
        console.error('Error inserting into team_info:', error);
        res.status(500).json({ success: false, message: 'An error occurred while inserting into team_info.' });
      } else {
        res.json({ success: true, message: 'Team info was inserted based on the leader name.' });
      }
    });
  } catch (error) {
    console.error('Error accepting the invite:', error);
    res.status(500).json({ success: false, message: 'An error occurred while accepting the invite.' });
  }
});

app.get(`/api/getmember/:lName`, async (req, res) => {
  const lName = req.params.lName;

  try {
    // Fetch teamid based on leadername (lName)
    const nestedQuery = `
      SELECT members
      FROM team_info
      WHERE team_id = (
        SELECT teamid
        FROM team
        WHERE leadername = '${lName}'
      )
    `;

    connection.query(nestedQuery, (error, results) => {
      if (error) {
        console.error('Error fetching members:', error);
        res.status(500).json({ success: false, message: 'An error occurred while fetching members.' });
      } else {
        if (results.length > 0) {
          const members = results.map(result => result.members);
          res.json({ success: true, members: members });
        } else {
          res.status(404).json({ success: false, message: 'No members found for the leader name.' });
        }
      }
    });
  } catch (error) {
    console.error('Error fetching members:', error);
    res.status(500).json({ success: false, message: 'An error occurred while fetching members.' });
  }
});

app.put(`/api/updateslot/:lName`, async (req, res) => {
  const lName = req.params.lName;

  try {
    // Update the number of slots by decreasing by 1
    const updateQuery = `
      UPDATE team 
      SET noofslots = noofslots - 1
      WHERE leadername = '${lName}' AND noofslots > 0
    `;

    connection.query(updateQuery, (error, results) => {
      if (error) {
        console.error('Error updating slots:', error);
        res.status(500).json({ success: false, message: 'An error occurred while updating slots.' });
      } else {
        if (results.affectedRows > 0) {
          res.json({ success: true, message: 'Slots updated successfully.' });
        } else {
          res.status(404).json({ success: false, message: 'No slots updated for the leader name or slots are already at 0.' });
        }
      }
    });
  } catch (error) {
    console.error('Error updating slots:', error);
    res.status(500).json({ success: false, message: 'An error occurred while updating slots.' });
  }
});

app.put('/api/updateStatus/:teamId/:facName', async (req, res) => {
  const { teamId, facName } = req.params; // Corrected parameter destructuring
  console.log("teamId : ", teamId);
  console.log("facname : ", facName);
  try {
    // Update the 'status' attribute for the entry with the given 'teamId' and 'facName'
    // Perform the database update here using proper parameter placeholders
    // Example using SQL (assuming your database uses single quotes for string literals):

    const updateQuery = 'UPDATE faculty_invites SET status = "Accepted" WHERE team_id = ? AND fac_name = ?'; // Corrected SQL syntax and added placeholders
    connection.query(updateQuery, [teamId, facName], (error, results) => {
      if (error) {
        res.status(500).json({ success: false, message: 'Error updating status' });
      } else {
        res.json({ success: true, message: 'Updated status' });
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error updating status' });
  }
});





app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});

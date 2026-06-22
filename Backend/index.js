
//import express file
const express = require('express');
const pool = require('./db.js');
const bodyparser = require('body-parser');
const app = express();

const cookieParser=require('cookie-parser');
const jwt=require('jsonwebtoken');

app.use(cookieParser());

const cors = require('cors');

app.use(cors({
  origin: 'http://localhost:5173', // ✅ Allow your frontend origin
  credentials: true               // ✅ Allow cookies to be sent
}));

app.use(bodyparser.json());

//Access-Control-Allow-Origin code
// app.use((req, res, next) => {
//     res.header("Access-Control-Allow-Origin", "*"); // Allow all origins
//     res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT,DELETE"); // Allow specific methods
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization"); // Allow specific headers
//     next();
// });  


app.get('/', (req, res) => {
    res.send("<H1>MENU CARD API..<H1>");
});

// Select All menu
app.get('/menu', async (req, res) => {
    try {
        var result = await pool.query('select * from menu')
        res.json({ menu: result.rows });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('server Error');
    }
});

//Select Menu by ID
app.get('/menuById', async (req, res) => {
    try {
        const { id } = req.body;
        var result = await pool.query('select * from menu where mid=$1', [id])
        if(result.rows.length==0){
          return res.status(404).json({ status: "404", message: "Menu item not found" });
        }else{
        res.json({ menu: result.rows });
        }
    } catch (err) {
        console.error(err.message);
        res.status(500).send('server Error');
    }
});

// delete By ID 
app.delete('/delmenuById', async (req, res) => {
    try {
        const { mid } = req.body;
        var result = await pool.query('delete from menu where mid=$1', [mid])
        //res.json({ menu: result.rows });
        if (result.rowCount === 0) {
        return res.status(404).json({ status: "404", message: "Menu item not found" });
        }else{
        res.send({status:"200",message:"Delete Successfully"})
        } 
    } catch (err) {
        console.error(err.message);
        res.status(500).send('server Error');
    }
});

//insert (Add data) 
app.post('/addmenu', async (req, res) => {
    try {
        
        const {mname,price,fid,qid} = req.body;
          if (!mname || !price || !fid || !qid) {
            return res.status(400).json({
                status: "400",
                message: "Missing required fields (mname, price, fid, qid)"
            }); 
        }
        var result = await pool.query('insert into menu(mname,price,fid,qid)values($1,$2,$3,$4) returning *',[mname,price,fid,qid])
        res.status(201).json({status: "201",message: "Saved successfully",data: result.rows[0] // return the inserted row
        }); 
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ status: "500", message: "Server error", error: err.message });
    }
});

//Update menu
app.put('/updatemenu', async (req, res) => {
    try {
        
        const {mid,mname,price,fid,qid} = req.body;
        var result = await pool.query('update menu set mname=$1,price=$2,fid=$3,qid=$4 where mid=$5 returning *',[mname,price,fid,qid,mid])
         if (result.rows.length === 0) {
            return res.status(404).json({ status: "404", message: "Menu item not found" });
        }
        res.status(201).json({status: "201",message: "UPDATE successfully",data: result.rows[0] // return the inserted row
        });
        } catch (err) {
        console.error(err.message);
        res.status(500).json({ status: "500", message: "Server error", error: err.message })
    }
});

//Admin login API
app.post('/admin-login', async (req, res) => {
  try {
    const { uname, pass } = req.body;
    if (!uname || !pass) {
      return res.status(400).json({ status: 400, message: "Missing username or password" });
    }
    const result = await pool.query('SELECT uname, pass FROM admin WHERE uname = $1 AND pass = $2',[uname, pass]);
    if (result.rows.length === 0) {
      return res.status(401).json({ status: 401, message: "Invalid username or password" });
    }
     let token=jwt.sign({pass},"appppppp");
     
     res.cookie("token", token, {
     httpOnly: true,    // 🛡 Prevent JS from reading the cookie
     secure: false,     // Set to true in production (HTTPS)
     sameSite: "lax",   // 🛡 Protect against CSRF
     maxAge: 60 * 60 * 1000 // 1 hour
     });    


    return res.status(200).json({ status: 200, message: "Login Successfully" });

   } catch (err) {
    console.error("Login error:", err.message);
    return res.status(500).json({ status: 500, message: "Server error" });
  }
});


//food category select
app.get('/food', async (req, res) => {
    try {
        var result = await pool.query('select * from food_cat')
        res.json({ food: result.rows });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('server Error');
    }

});
// Insert Food Category
app.post('/addfoodcat', async (req, res) => {
    try {
        
        const {category} = req.body;
          if (!category) {
            return res.status(400).json({
                status: "400",
                message: "Missing required fields (category)"
            }); 
        }
        var result = await pool.query('insert into food_cat(category)values($1) returning *',[category])
        res.status(201).json({status: "201",message: "Saved successfully",data: result.rows[0] // return the inserted row
        }); 
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ status: "500", message: "Server error", error: err.message });
    }
});

//Update Food category
app.put('/updatefoodcat', async (req, res) => {
    try {
        
        const {fid,category} = req.body;
        var result = await pool.query('update food_cat set category=$1 where fid=$2 returning *',[category,fid])
         if (result.rows.length === 0) {
            return res.status(404).json({ status: "404", message: "Food category not found" });
        }
        res.status(201).json({status: "201",message: "UPDATE successfully",data: result.rows[0] // return the inserted row
        });
        } catch (err) {
        console.error(err.message);
        res.status(500).json({ status: "500", message: "Server error", error: err.message })
    }
});

// del food category by fid
app.delete('/delfoodByFid', async (req, res) => {
    try {
        const { fid } = req.body;
        var result = await pool.query('delete from food_cat where fid=$1', [fid])
        if (result.rowCount === 0) {
        return res.status(404).json({ status: "404", message: "food category fid not found" });
        }else{
        res.send({status:"200",message:"Delete Successfully"})
        } 
    } catch (err) {
        console.error(err.message);
        res.status(500).send('server Error');
    }
});

// QUANTITY 
app.get('/qty', async (req, res) => {
    try {
        var result = await pool.query('select * from qty_mast')
        res.json({ qty_mast: result.rows });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('server Error');
    }
});

//Insert into QTY
app.post('/addqty', async (req, res) => {
    try {
        const {size} = req.body;
          if (!size) {
            return res.status(400).json({
                status: "400",
                message: "Missing required fields (size)"
            }); 
        }
        var result = await pool.query('insert into qty_mast(size)values($1) returning *',[size])
        res.status(201).json({status: "201",message: "Saved successfully",data: result.rows[0] // return the inserted row
        }); 
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ status: "500", message: "Server error", error: err.message });
    }
});
// Update qty (size)
app.put('/updateqty', async (req, res) => {
    try {
        
        const {qid,size} = req.body;
        var result = await pool.query('update qty_mast set size=$1 where qid=$2 returning *',[size,qid])
         if (result.rows.length === 0) {
            return res.status(404).json({ status: "404", message: "qty not found" });
        }
        res.status(201).json({status: "201",message: "UPDATE successfully",data: result.rows[0] // return the inserted row
        });
        } catch (err) {
        console.error(err.message);
        res.status(500).json({ status: "500", message: "Server error", error: err.message })
    }
});
//delete Qty
app.delete('/delqtyByQid', async (req, res) => {
    try {
        const { qid } = req.body;
        var result = await pool.query('delete from qty_mast where qid=$1', [qid])
        if (result.rowCount === 0) {
        return res.status(404).json({ status: "404", message: "qid not found" });
        }else{
        res.send({status:"200",message:"Delete Successfully"})
        } 
    } catch (err) {
        console.error(err.message);
        res.status(500).send('server Error');
    }
});

//Dashbord API
app.get('/menucard', async (req, res) => {
    try {
        var result = await pool.query('select mid,mname,price,category,size from menu,food_cat,qty_mast where food_cat.fid=menu.fid and qty_mast.qid=menu.qid')
        res.json({ menu: result.rows });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('server Error');
    }
});
// Dashboard Count
app.get('/cnt', async (req, res) => {
    try {
        var result = await pool.query('select(select count(*) from menu) as menu_cnt,(select count(*) from food_cat) as foodcat_cnt,(select count(*) from qty_mast) as qty_cnt')
       res.json(result.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('server Error');
    }
});
// ContactUS API
app.post('/ContactUS', async (req, res) => {
    try {        
        const {name,mail,subject,message} = req.body;
          if (!name || !mail || !subject || !message) {
            return res.status(400).json({
                status: "400",
                message: "Missing required fields (name,mail,subject,message)"
            }); 
        }
        var result = await pool.query('insert into Contact_Us(name,mail,subject,message)values($1,$2,$3,$4) returning *',[name,mail,subject,message])
        res.status(200).json({status: "200",message: "Message received successfully!" }); 
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ status: "500", message: "Server error, try again later.", error: err.message });
    }
});

// Admin logout API
app.get('/admin-logout', (req, res) => {
   res.cookie("token","");
   res.redirect("/admin-login");
});


//check-auth API
app.get('/check-auth', (req, res) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({ status: 401, message: "Unauthorized" });
  }

  try {
    jwt.verify(token, "appppppp");
    return res.status(200).json({ status: 200, message: "Authenticated" });
  } catch (err) {
    return res.status(401).json({ status: 401, message: "Invalid token" });
  }
});


app.listen(3000, () => {
    console.log('Server Started.. http://localhost:3000');  
});


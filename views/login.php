<!-- <?php

// include "config.js";


// function Login(){

//     if(empty($_POST['UserEmail'])){

//         $this->HandleError("UserEmail is empty!");
//         return false;

//     } if(empty($_POST['UserPassword'])){
//         $this->HandleError("UserPassword is empty!");
//         return false;
//     }

//     $UserEmail = trim($_POST['UserEmail']);
//     $UserPassword = trim($_POST['UserPassword']);

//     if(!$this->CheckLoginInDB($UserEmail,$UserPassword)){
//         return false;
//     }
//     session_start();

//     $_SESSION[$this->GetLoginSessionVar()] = $UserEmail;
//     return true;
// }

// function CheckLoginInDB($UserEmail,$UserPassword)
// {
//     if(!$this->DBLogin())
//     {
//         $this->HandleError("Database login failed!");
//         return false;
//     }          
//     $UserEmail = $this->SanitizeForSQL($UserEmail);
//     $pwdmd5 = md5($UserPassword);
//     $qry = "Select name, email from $this->tablename ".
//         " where UserEmail='$UserEmail' and UserPassword='$pwdmd5' ".
//         " and confirmcode='y'";
    
//     $result = mysql_query($qry,$this->connection);
    
//     if(!$result || mysql_num_rows($result) <= 0)
//     {
//         $this->HandleError("Error logging in. ".
//             "The UserEmail or UserPassword does not match");
//         return false;
//     }
//     return true;
// }




?> -->
// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Paper, Button, TableSortLabel, Typography, Grid, Card, CardContent,
} from "@mui/material";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, PieChart, Pie, Cell } from "recharts";
import { useNavigate } from "react-router-dom";
import { AppBar, Toolbar, IconButton } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";

export const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [reports, setReports] = useState(null);
  // eslint-disable-next-line no-unused-vars
  const [goals, setGoals] = useState([]);
  const [orderBy, setOrderBy] = useState("email");
  const [order, setOrder] = useState("asc");
  // eslint-disable-next-line no-unused-vars
  const navigate = useNavigate();

  useEffect(() => {
    fetchUsers();
    // fetchReports();
    // fetchFinancialGoals();
    // eslint-disable-next-line react-hooks/exhaustive-deps
}, [orderBy, order]);

useEffect(()=>{
    fetchTransactions();
    
  },[])
  useEffect(()=>{
    fetchFinancialGoals();
    
  },[])

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };
  


  const fetchUsers = async () => {
    try {
      const res = await axios.get("http://localhost:3000/users");
      let sortedData = res.data.data || [];
      sortedData.sort((a, b) => (order === "asc" ? (a[orderBy] > b[orderBy] ? 1 : -1) : (a[orderBy] < b[orderBy] ? 1 : -1)));
      setUsers(sortedData);
      console.log(sortedData);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const fetchTransactions = async () => {
    try {
      const res = await axios.get("http://localhost:3000/admin/transactions");
      setTransactions(res.data.data || []);
      console.log("transaction",res.data.data);
    } catch (error) {
      console.error("Error fetching transactions:", error);
    }
  };

//   const fetchReports = async () => {
//     try {
//       const res = await axios.get("http://localhost:3000/user/reports");
//       setReports(res.data);
//     } catch (error) {
//       console.error("Error fetching reports:", error);
//     }
//   };

  const fetchFinancialGoals = async () => {
    try {
      const res = await axios.get("http://localhost:3000/admin/financial-goals");
      setGoals(res.data.data || []);
      console.log("Financial goal:",res.data.data)
        
    } catch (error) {
      console.error("Error fetching financial goals:", error);
    }
  };

  const handleSort = (property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleDeleteUser = async (userId) => {
    try {
      await axios.delete(`http://localhost:3000/admin/users/${userId}`);
      fetchUsers();
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

//   const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#A28DFB"];

  return (
    // <div style={{ padding: "20px" }}>
    //   {/* Dashboard Header */}
    //   <Typography variant="h4" align="center" gutterBottom>
    //     Admin Dashboard
    //   </Typography>

    //   {/* Reports Summary */}
    //   <Grid container spacing={3} justifyContent="center">
    //     <Grid item xs={12} md={3}>
    //       <Card elevation={3}>
    //         <CardContent>
    //           <Typography variant="h6">Total Users</Typography>
    //           <Typography variant="h4">{users.length}</Typography>
    //         </CardContent>
    //       </Card>
    //     </Grid>
    //     <Grid item xs={12} md={3}>
    //       <Card elevation={3}>
    //         <CardContent>
    //           <Typography variant="h6">Total Income</Typography>
    //           <Typography variant="h4">${reports?.totalIncome || 0}</Typography>
    //         </CardContent>
    //       </Card>
    //     </Grid>
    //     <Grid item xs={12} md={3}>
    //       <Card elevation={3}>
    //         <CardContent>
    //           <Typography variant="h6">Total Expenses</Typography>
    //           <Typography variant="h4">${reports?.totalExpenses || 0}</Typography>
    //         </CardContent>
    //       </Card>
    //     </Grid>
    //   </Grid>

    //   {/* Users Table */}
    //   <Card elevation={3} style={{ padding: "20px", marginTop: "20px" }}>
    //     <Typography variant="h6">User Management</Typography>
    //     <TableContainer component={Paper}>
    //       <Table>
    //         <TableHead>
    //           <TableRow>
    //             <TableCell>
    //               <TableSortLabel active={orderBy === "email"} direction={order} onClick={() => handleSort("email")}>
    //                 Email
    //               </TableSortLabel>
    //             </TableCell>
    //             <TableCell>Name</TableCell>
    //             <TableCell>Role</TableCell>
    //             <TableCell>Actions</TableCell>
    //           </TableRow>
    //         </TableHead>
    //         <TableBody>
    //           {users.map((user) => (
    //             <TableRow key={user._id}>
    //               <TableCell>{user.email}</TableCell>
    //               <TableCell>{`${user.firstName} ${user.lastName}`}</TableCell>
    //               <TableCell>{user.role}</TableCell>
    //               <TableCell>
    //                 <Button variant="contained" color="error" onClick={() => handleDeleteUser(user._id)}>
    //                   Delete
    //                 </Button>
    //               </TableCell>
    //             </TableRow>
    //           ))}
    //         </TableBody>
    //       </Table>
    //     </TableContainer>
    //   </Card>

    //   {/* Charts Section */}
    //   <Grid container spacing={3} justifyContent="center" style={{ marginTop: "20px" }}>
    //     {/* Bar Chart */}
    //     <Grid item xs={12} md={6}>
    //       <Card elevation={3}>
    //         <CardContent>
    //           <Typography variant="h6" align="center">
    //             Transactions Summary
    //           </Typography>
    //           <BarChart width={450} height={300} data={transactions}>
    //             <XAxis dataKey="type" />
    //             <YAxis />
    //             <Tooltip />
    //             <Legend />
    //             <Bar dataKey="amount" fill="#0088FE" />
    //           </BarChart>
    //         </CardContent>
    //       </Card>
    //     </Grid>

    //     {/* Pie Chart */}
    //     <Grid item xs={12} md={6}>
    //       <Card elevation={3}>
    //         <CardContent>
    //           <Typography variant="h6" align="center">
    //             User Distribution
    //           </Typography>
    //           <PieChart width={300} height={300}>
    //             <Pie data={users.map((user) => ({ name: user.role, value: 1 }))} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} label>
    //               {users.map((_, index) => (
    //                 <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
    //               ))}
    //             </Pie>
    //             <Tooltip />
    //           </PieChart>
    //         </CardContent>
    //       </Card>
    //     </Grid>
    //   </Grid>
    // </div>
    // <div>HELLO ADMIN </div>
    <div style={{ padding: "20px" }}>
        <IconButton
  color="error"
  onClick={handleLogout}
  style={{ position: "absolute", top: 20, right: 20, zIndex: 1000 }}
>
  <LogoutIcon />
</IconButton>


  {/* Dashboard Header */}
  <Typography variant="h4" align="center" gutterBottom>
    Admin Dashboard
  </Typography>

  {/* Users Table */}
  <Card elevation={3} style={{ padding: "20px", marginTop: "20px" }}>
    <Typography variant="h6">User Management</Typography>
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>
              <TableSortLabel
                active={orderBy === "email"}
                direction={order}
                onClick={() => handleSort("email")}
              >
                Email
              </TableSortLabel>
            </TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Role</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user._id}>
              <TableCell>{user.email}</TableCell>
              <TableCell>{`${user.firstName} ${user.lastName}`}</TableCell>
              <TableCell>{user.role}</TableCell>
              <TableCell>
                <Button
                  variant="contained"
                  color="error"
                  onClick={() => handleDeleteUser(user._id)}
                >
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  </Card>
  <Card elevation={3} style={{ padding: "20px", marginTop: "20px" }}>
  <Typography variant="h6">Transaction Details</Typography>
  <TableContainer component={Paper}>
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Transaction ID</TableCell>
          <TableCell>User</TableCell>
          <TableCell>Type</TableCell>
          <TableCell>Amount</TableCell>
          <TableCell>Date</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {transactions.map((tx) => (
          <TableRow key={tx._id}>
            <TableCell>{tx?._id}</TableCell>
            <TableCell>{tx.user?.email || "N/A"}</TableCell>
            <TableCell>{tx?.type}</TableCell>
            <TableCell>${tx?.amount}</TableCell>
            <TableCell>{new Date(tx?.date).toLocaleDateString()}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </TableContainer>
</Card>

{/* Financial goal section */}
<Card elevation={3} style={{ padding: "20px", marginTop: "20px" }}>
  <Typography variant="h6">Financial Goals</Typography>
  <TableContainer component={Paper}>
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Goal Name</TableCell>
          <TableCell>Start Date</TableCell>
          <TableCell>End Date</TableCell>
          <TableCell>Target Amount</TableCell>
          <TableCell>Saved Amount</TableCell>
          <TableCell>Status</TableCell>
          <TableCell>Notes</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {goals?.map((goal) => (
          <TableRow key={goal?._id}>
            <TableCell>{goal?.goalName || "—"}</TableCell>
            <TableCell>{goal?.startDate ? new Date(goal.startDate).toLocaleDateString() : "—"}</TableCell>
            <TableCell>{goal?.endDate ? new Date(goal.endDate).toLocaleDateString() : "—"}</TableCell>
            <TableCell>${goal?.targetAmount?.toLocaleString() || 0}</TableCell>
            <TableCell>${goal?.savedAmount?.toLocaleString() || 0}</TableCell>
            <TableCell>{goal?.status || "—"}</TableCell>
            <TableCell>{goal?.notes || "—"}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </TableContainer>
</Card>


</div>

  );
};
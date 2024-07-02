import React, { useState, useEffect } from 'react';
import {
  Typography, Container, Box, CircularProgress, Button, Dialog,
  DialogActions, DialogContent, DialogTitle, TextField,
  MenuItem, Select, FormControl, InputLabel
} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ReportListAdmin = () => {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const [currentReport, setCurrentReport] = useState({
    reportId: 0,
    reportTitle: '',
    reportFeedback: '',
    reportType: '',
    siteID: '',
    isApproved: false,
    isReviewedByAdmin: false
  });

  useEffect(() => {
    fetchReports();
  }, []);

  const handleOpen = async (reportId) => {
    try {
      const url = `https://localhost:7262/api/Report/get-report/${reportId}`; // Adjust the URL as necessary

      const response = await axios.get(url);
      setCurrentReport(response.data);
      setOpen(true);
    } catch (error) {
      console.error('Failed to fetch report details:', error);
      alert('Failed to fetch report details');
    }
  };

  const handleClose = () => {
    setOpen(false);
    setCurrentReport({
      reportId: 0,
      reportTitle: '',
      reportFeedback: '',
      reportType: '',
      siteID: '',
      isApproved: false,
      isReviewedByAdmin: false
    });

    // Refresh the reports list to exclude the viewed report
    fetchReports();
  };

  const handleApprove = async () => {
    console.log('Approve button clicked');
    if (currentReport) {
      try {
        const url = `https://localhost:7262/api/Report/approve-report/${currentReport.reportId}`;
  
        const response = await axios.post(url);
        if (response.data.flag) {
          alert(response.data.message);
          handleClose();
  
          // Filter out the approved report from the state
          setReports(prevReports => prevReports.filter(report => report.reportId !== currentReport.reportId));
  
          // Redirect logic to edit site
          redirectToEditSite(currentReport.siteID);
        }
      } catch (error) {
        console.error('Failed to approve report:', error);
        alert('Failed to approve report');
      }
    }
  };
  

  const redirectToEditSite = (siteId) => {
    // Implement your redirection logic to the edit site page
    navigate(`/admin/glo2go/site/` + siteId);
  };

  const fetchReports = async () => {
    setLoading(true);
    try {
      const response = await axios.get('https://localhost:7262/api/Report/get-all-reports');
      if (response.data) {
        console.log(response.data);
        // Filter out approved reports
        const filteredReports = response.data.filter(report => !report.isApproved);
        setReports(filteredReports);
      } else {
        throw new Error('No data returned');
      }
    } catch (error) {
      console.error('Failed to fetch reports:', error);
      setError('Failed to fetch reports, please try again later.');
    }
    setLoading(false);
  };
  

  const columns = [
    { field: 'reportId', headerName: 'ID', flex: 1 },
    { field: 'reportTitle', headerName: 'Title', flex: 1 },
    { field: 'reportType', headerName: 'Type', flex: 1 },
    {
      field: 'actions',
      headerName: 'Actions',
      headerAlign: 'center',
      sortable: false,
      flex: 1,
      renderCell: (params) => (
        <Box sx={{ display: 'flex', justifyContent: 'space-around' }}>
          <Button variant="outlined" onClick={() => handleOpen(params.row.reportId)}>View</Button>
        </Box>
      ),
    }
  ];

  return (
    <Container maxWidth="lg">
      <Typography variant="h4" textAlign="center" sx={{ margin: '20px 0' }}>Report Management</Typography>
      <Box sx={{ height: 700, width: '100%' }}>
        <DataGrid
          rows={reports}
          columns={columns}
          pageSize={5}
          checkboxSelection
          disableSelectionOnClick
          getRowId={(row) => row.reportId}
          loading={loading}
        />
      </Box>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Report Details</DialogTitle>
        <DialogContent>
          <TextField margin="dense" name="reportTitle" label="Title" type="text" fullWidth variant="outlined" value={currentReport?.reportTitle || ''} disabled />
          <TextField
            margin="dense"
            name="reportFeedback"
            label="Feedback"
            multiline  // Enable multiline input
            rows={4}   // Set the number of rows to display initially
            fullWidth
            variant="outlined"
            value={currentReport?.reportFeedback || ''}
            disabled
            />
          <TextField margin="dense" name="reportType" label="Type" type="text" fullWidth variant="outlined" value={currentReport?.reportType || ''} disabled />
          <TextField margin="dense" name="siteID" label="Site ID" type="text" fullWidth variant="outlined" value={currentReport?.siteID || ''} disabled />
          <TextField margin="dense" name="isApproved" label="Approved" type="text" fullWidth variant="outlined" value={currentReport?.isApproved ? 'Yes' : 'No'} disabled />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleApprove} color="primary">Approve</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default ReportListAdmin;

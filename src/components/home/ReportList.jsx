import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
  Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Button, Dialog, DialogTitle, DialogContent, DialogActions, Typography, Paper, TablePagination
} from '@mui/material';
import { CheckCircle, Cancel } from '@mui/icons-material';
import { styled } from '@mui/system';

const StatusCell = styled(TableCell)(({ theme, status }) => ({
  color: status ? 'green' : 'red',
  fontWeight: 'bold',
  alignItems: 'center',
}));

const SiteIDCell = styled(TableCell)(({ theme }) => ({
  cursor: 'pointer',
  '&:hover': {
    textDecoration: 'underline',
  },
}));

const ReportList = () => {
  const { travelerEmail } = useParams();
  const navigate = useNavigate();
  const [reports, setReports] = useState([]);
  const [selectedReport, setSelectedReport] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const iconStyle = { marginRight: '4px', fontSize: '24px' };

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const response = await axios.get('https://localhost:7262/api/Report/get-report', {
          params: { reportEmail: travelerEmail }
        });
        console.log(response);
        setReports(response.data);
      } catch (error) {
        console.error('Error fetching reports:', error);
      }
    };

    if (travelerEmail) {
      fetchReports();
    }
  }, [travelerEmail, modalOpen]);

  const handleRowClick = (report) => {
    setSelectedReport(report);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedReport(null);
  };

  const handleSiteClick = (siteID) => {
    navigate(`/glo2go/AttractionsList/${siteID}`);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Box>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Report Title</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Site ID</TableCell>
              <TableCell>Approved</TableCell>
              <TableCell>Reviewed by Admin</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {reports.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((report) => (
              <TableRow key={report.ReportId} onClick={() => handleRowClick(report)}>
                <TableCell>{report.reportTitle}</TableCell>
                <TableCell>{report.reportType}</TableCell>
                <SiteIDCell onClick={(e) => {
                  e.stopPropagation();
                  handleSiteClick(report.siteID);
                }}>
                  {report.siteID}
                </SiteIDCell>
                <StatusCell status={report.isApproved}>
                  <Box display="flex" alignItems="center">
                    {report.isApproved ? <CheckCircle style={iconStyle} /> : <Cancel style={iconStyle} />}
                    {report.isApproved ? 'Yes' : 'No'}
                  </Box>
                </StatusCell>
                <StatusCell status={report.isReviewedByAdmin}>
                  <Box display="flex" alignItems="center">
                    {report.isReviewedByAdmin ? <CheckCircle style={iconStyle} /> : <Cancel style={iconStyle} />}
                    {report.isReviewedByAdmin ? 'Yes' : 'No'}
                  </Box>
                </StatusCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        {reports.length > 5 && (
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={reports.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        )}
      </TableContainer>

      {selectedReport && (
        <Dialog open={modalOpen} onClose={handleCloseModal} maxWidth="md" fullWidth>
          <DialogTitle>Report Details</DialogTitle>
          <DialogContent dividers>
            <Box mb={2}>
              <Typography variant="h6" gutterBottom>Title</Typography>
              <Typography variant="body1">{selectedReport.reportTitle}</Typography>
            </Box>
            <Box mb={2}>
              <Typography variant="h6" gutterBottom>Feedback</Typography>
              <Box p={2} style={{ border: '1px solid #ccc', borderRadius: '4px', maxHeight: '300px', overflowY: 'auto', whiteSpace: 'pre-wrap' }}>
                {selectedReport.reportFeedback}
              </Box>
            </Box>
            <Box mb={2}>
              <Typography variant="h6" gutterBottom>Type</Typography>
              <Typography variant="body1">{selectedReport.reportType}</Typography>
            </Box>
            <Box mb={2}>
              <Typography variant="h6" gutterBottom>Site ID</Typography>
              <Typography variant="body1">{selectedReport.siteID}</Typography>
            </Box>
            <Box mb={2}>
              <Typography variant="h6" gutterBottom>Approved</Typography>
              <Typography variant="body1">{selectedReport.isApproved ? 'Yes' : 'No'}</Typography>
            </Box>
            <Box mb={2}>
              <Typography variant="h6" gutterBottom>Reviewed by Admin</Typography>
              <Typography variant="body1">{selectedReport.isReviewedByAdmin ? 'Yes' : 'No'}</Typography>
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseModal} variant="contained" color="primary">Close</Button>
          </DialogActions>
        </Dialog>
      )}
    </Box>
  );
};

export default ReportList;

import React, { useState, useEffect } from "react";
import { Box, Button, IconButton, Typography, useTheme } from "@mui/material";
import { tokens } from "../../../theme";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import PointOfSaleIcon from "@mui/icons-material/PointOfSale";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import TrafficIcon from "@mui/icons-material/Traffic";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import Header from "../../../components/Statistics/Header";
import LineChart from "../../../components/Statistics/LineChart";
import GeographyChart from "../../../components/Statistics/GeographyChart";
import BarChart from "../../../components/Statistics/BarChart";
import StatBox from "../../../components/Statistics/StatBox";
import ProgressCircle from "../../../components/Statistics/ProgressCircle";
import axios from "axios";

const Dashboard = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [siteTotal, setSiteTotal] = useState(0);
  const [userTotal, setUserTotal] = useState(0);
  const [reportTotal, setReportTotal] = useState(0);
  const [latestReports, setLatestReports] = useState([]);
  const [popularSites, setPopularSites] = useState([]);
  const [reviewRatings, setReviewRatings] = useState([]);

  useEffect(() => {
    const fetchPopularSites = async () => {
      try {
        const response = await axios.get("https://localhost:7262/api/DashBoard/get-popular-site", {
          params: { count: 5 }
        });

        const formattedData = response.data.map(site => ({
          x: site.siteName,
          y: site.reviewCount
        }));

        setPopularSites([{ id: "Popular Sites", data: formattedData }]);
      } catch (error) {
        console.error("Error fetching popular sites:", error);
      }
    };

    fetchPopularSites();
  }, []);

  useEffect(() => {
    const fetchReviewRatings = async () => {
      try {
        const response = await axios.get("https://localhost:7262/api/DashBoard/api/reviews/count-by-rating");
        setReviewRatings(response.data);
      } catch (error) {
        console.error("Error fetching review ratings:", error);
      }
    };

    fetchReviewRatings();
  }, []);

  useEffect(() => {
    const fetchSiteTotal = async () => {
      try {
        const response = await axios.get("https://localhost:7262/api/DashBoard/total-sites-count");
        console.log(response.data);

        setSiteTotal(response.data);
      } catch (error) {
        console.error("Error fetching site total:", error);
      }
    };

    fetchSiteTotal();
  }, []);

  useEffect(() => {
    const fetchUserTotal = async () => {
      try {
        const response = await axios.get("https://localhost:7262/api/DashBoard/total-users-count");
        setUserTotal(response.data);
      } catch (error) {
        console.error("Error fetching site total:", error);
      }
    };

    fetchUserTotal();
  }, []);

  useEffect(() => {
    const fetchReportTotal = async () => {
      try {
        const response = await axios.get("https://localhost:7262/api/DashBoard/api/reports/total-count");
        setReportTotal(response.data);
      } catch (error) {
        console.error("Error fetching site total:", error);
      }
    };

    fetchReportTotal();
  }, []);

  useEffect(() => {
    const fetchLatestReports = async () => {
      try {
        const response = await axios.get('https://localhost:7262/api/DashBoard/get-latest-report', {
          params: { count: 5 }
        });        
        setLatestReports(response.data);
      } catch (error) {
        console.error("Error fetching latest reports:", error);
      }
    };

    fetchLatestReports();
  }, []);

  return (
    <Box m="20px">
      {/* HEADER */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="DASHBOARD" subtitle="Glo2Go dashboard" />
        <Box>
          <Button
            sx={{
              backgroundColor: colors.blueAccent[700],
              color: colors.grey[100],
              fontSize: "14px",
              fontWeight: "bold",
              padding: "10px 20px",
            }}
          >
            <DownloadOutlinedIcon sx={{ mr: "10px" }} />
            Download Reports
          </Button>
        </Box>
      </Box>

      {/* GRID & CHARTS */}
      <Box
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gridAutoRows="140px"
        gap="20px"
      >
        {/* ROW 1 */}
        <Box
          gridColumn="span 4"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title={siteTotal.toString()}
            subtitle="Site Total"
            progress="1.00"
            icon={
              <LocationOnIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>
        <Box
          gridColumn="span 4"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title={userTotal.toString()}
            subtitle="Total User"
            progress="1.00"
            icon={
              <PersonAddIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>
        <Box
          gridColumn="span 4"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title={reportTotal.toString()}
            subtitle="Report Received"
            progress="1.00"
            icon={
              <TrafficIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>
        {/* <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
        </Box> */}
        {/* ROW 2 */}
        <Box
          gridColumn="span 8"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
        >
          <Box
            mt="25px"
            p="0 30px"
            display="flex "
            justifyContent="space-between"
            alignItems="center"
          >
            <Box>
              <Typography
                variant="h5"
                fontWeight="600"
                color={colors.grey[100]}
              >
                Review Ratings Distribution
              </Typography>
              <Typography
                variant="h3"
                fontWeight="bold"
                color={colors.greenAccent[500]}
              >
                {Object.values(reviewRatings).reduce((a, b) => a + b, 0)} Total Reviews
              </Typography>
            </Box>
            <Box>
              <IconButton>
                <DownloadOutlinedIcon
                  sx={{ fontSize: "26px", color: colors.greenAccent[500] }}
                />
              </IconButton>
            </Box>
          </Box>
          <Box height="250px" m="-20px 0 0 0">
            <LineChart isDashboard={true} data={popularSites} />
          </Box>
        </Box>
        <Box
          gridColumn="span 4"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
          overflow="auto"
        >
        <Box gridColumn="span 4" gridRow="span 2" backgroundColor={colors.primary[400]} overflow="auto">
          <Box display="flex" justifyContent="space-between" alignItems="center" borderBottom={`4px solid ${colors.primary[500]}`} colors={colors.grey[100]} p="15px">
            <Typography color={colors.grey[100]} variant="h5" fontWeight="600">
              Recent Reports
            </Typography>
          </Box>
          {latestReports.map((report) => (
            <Box
              key={report.reportId}
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              borderBottom={`4px solid ${colors.primary[500]}`}
              p="15px"
              onClick={() => window.location.href = `/report/${report.ReportId}`}
              sx={{ cursor: "pointer", transition: "background-color 0.3s ease" }}
              _hover={{ backgroundColor: colors.grey[200] }}
            >
              <Box flex="1">
                <Typography color={colors.greenAccent[500]} variant="body1" fontWeight="600">
                  {report.reportTitle}
                </Typography>
              </Box>
              <Box backgroundColor={colors.greenAccent[500]} p="5px 10px" borderRadius="4px" color={colors.grey[100]} fontSize="small">
                {report.reportType}
              </Box>
            </Box>
          ))}
        </Box>
        </Box>

        {/* ROW 3 */}
        {/* <Box
          gridColumn="span 4"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
          p="30px"
        >
          <Typography variant="h5" fontWeight="600">
            Campaign
          </Typography>
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            mt="25px"
          >
            <ProgressCircle size="125" />
            <Typography
              variant="h5"
              color={colors.greenAccent[500]}
              sx={{ mt: "15px" }}
            >
              $48,352 revenue generated
            </Typography>
            <Typography>Includes extra misc expenditures and costs</Typography>
          </Box>
        </Box> */}
        <Box
          gridColumn="span 4"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
        >
          <Typography
            variant="h5"
            fontWeight="600"
            sx={{ padding: "30px 30px 0 30px" }}
          >
            Report Type
          </Typography>
          <Box height="250px" mt="-20px">
            <BarChart isDashboard={true} />
          </Box>
        </Box>
        <Box
          gridColumn="span 4"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
          padding="30px"
        >
          <Typography
            variant="h5"
            fontWeight="600"
            sx={{ marginBottom: "15px" }}
          >
            Geography Based Traffic
          </Typography>
          <Box height="200px">
            <GeographyChart isDashboard={true} />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;

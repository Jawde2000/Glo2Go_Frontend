// import React, { useState } from "react";
// import {
//   Card,
//   CardContent,
//   CardMedia,
//   Typography,
// } from "@mui/material";
// import { motion } from "framer-motion";

// const CardComponent = ({ title, description, image, link }) => {
//   const [hover, setHover] = useState(false);

//   return (
//     <motion.div whileHover={{ scale: 1.05 }}>
//       <Card
//         sx={{
//           width: 300,
//           height: 200,
//           backgroundColor: "#f2f2f2",
//           borderRadius: 10,
//           display: "flex",
//           alignItems: "center",
//           justifyContent: "center",
//           overflow: "hidden",
//           perspective: 1000,
//           boxShadow: "0 0 0 5px #ffffff80",
//           transition: "box-shadow 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
//         }}
//         onMouseEnter={() => setHover(true)}
//         onMouseLeave={() => setHover(false)}
//       >
//         <CardMedia
//           component="img"
//           height="140"
//           image={image}
//           alt={title}
//           sx={{
//             width: 48,
//             fill: "#333",
//             transition: "all 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
//             transform: hover ? "scale(0)" : "scale(1)",
//           }}
//         />
//         <CardContent
//           sx={{
//             position: "absolute",
//             top: 0,
//             left: 0,
//             width: "100%",
//             height: "100%",
//             padding: 20,
//             boxSizing: "border-box",
//             backgroundColor: "#f2f2f2",
//             transform: "rotateX(-90deg)",
//             transformOrigin: "bottom",
//             transition: "all 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
//           }}
//           onMouseEnter={() => setHover(true)}
//           onMouseLeave={() => setHover(false)}
//         >
//           <Typography variant="h5" sx={{ margin: 0, fontWeight: 700, color: "#333" }}>
//             {title}
//           </Typography>
//           <Typography variant="body1" sx={{ margin: "10px 0 0", fontSize: 14, color: "#777" }}>
//             {description}
//           </Typography>
//         </CardContent>
//       </Card>
//     </motion.div>
//   );
// };

// export default CardComponent;

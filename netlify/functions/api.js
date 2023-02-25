import axios from "axios";

// exports.handler = async function (event, context) {
//   const apiKey = process.env.MY_IMPORTANT_VARIABLE;
//   const data = await axios.get(
//     `https://www.mapquestapi.com/staticmap/v5/map?key=${apiKey}&locations=483 Queen St, M5V 2A9&defaultMarker=marker-sm-3B5998-22407F&size=1100,500@2x`
//   )
//   return {
//     statusCode: 200,
//     body: JSON.stringify(data)
//   };
// };

exports.handler = async function (event, context) {
  return console.log("hello")
};
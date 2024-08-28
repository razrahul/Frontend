import React from "react";
import {
  Box,
  Button,
  Heading,
  Image,
  Text,
  Grid,
  Badge,
  VStack,
} from "@chakra-ui/react";
import CourseAbout from "./CourseAbout.jsx";
import CourseDown from "./CourseOfferings.jsx";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

const CourseDetail = ({user}) => {

  const params = useParams();
  //  console.log(params.id)

   const { courses} =useSelector((state) => state.course)
   console.log(courses)

   const Course = courses.find((course) => course._id === params.id);
  //  console.log(Course)

  return (
    <>
      <Box bg="gray.800" color="white" minH="100vh" px={16} pt={16}>
        {/* Header */}
        <Grid templateColumns="1fr auto" alignItems="center">
          <Heading as="h1" size="lg" color="white">
            E-Learning Web App
          </Heading>
          {!user ? (
            <Link to={`/login`}>
              <Button colorScheme="orange">Login / Register</Button>
            </Link>
          )
          :null}
          
        </Grid>

        {/* Breadcrumb */}
        <Text mt={4} color="gray.400">
          Home &gt; {Course?.category}
        </Text>

        {/* Main Content */}
        <Grid
          templateColumns={["1fr", "1fr 1fr"]}
          gap={6}
          mt={6}
        >
          {/* Text Section */}
          <VStack align="flex-start" spacing={4}>
            <Badge colorScheme="green" fontSize="lg">
              Bestseller
            </Badge>
            <Heading as="h2" size="2xl">
             {Course?.title}
            </Heading>
            <Text fontSize="lg" color="gray.200">
              Become a Certified Data Scientist with PW Skills and utilize the
              Power of Generative AI with machine learning, NLP, etc. Learn
              top-in-demand skills from the best in the industry. Transform your
              career in a high-demand data analytics field.
            </Text>
            <Text fontSize="lg" color="gray.200">
              &gt; EMI Options Available
            </Text>
            <Grid templateColumns="1fr 1fr" gap={4} justifyContent={'center'}>
              <Button colorScheme="orange" size="lg" >
                Buy Now
              </Button>
              <Button colorScheme="gray" size="lg">
                Share
              </Button>
            </Grid>
          </VStack>

          {/* Image Section */}
          <Box maxW={'xl'} mt={[6, 0]} alignSelf='center' justifyContent='center' justifySelf='end'>
            <Image
              boxSize='full'
              src={Course?.poster.url}
              alt={Course?.title}
              borderRadius="lg"
            />
          </Box>
        </Grid>

        {/* Course Info Section */}
        <Grid
          templateColumns={["1fr", "repeat(5, 1fr)"]}
          bg="gray.700"
          mt={12}
          p={6}
          borderRadius="lg"
          gap={6}
        >
          <VStack align="flex-start">
            <Text fontWeight="bold" color="gray.400">
              Job Assistance
            </Text>
            <Text>Program</Text>
          </VStack>
          <VStack align="flex-start">
            <Text fontWeight="bold" color="gray.400">
              29th Aug 2024
            </Text>
            <Text>Date of Commencement</Text>
          </VStack>
          <VStack align="flex-start">
            <Text fontWeight="bold" color="gray.400">
              6 Months
            </Text>
            <Text>Duration</Text>
          </VStack>
          <VStack align="flex-start">
            <Text fontWeight="bold" color="gray.400">
              Live + Recorded
            </Text>
            <Text>Delivery Mode</Text>
          </VStack>
          <VStack align="flex-start">
            <Text fontWeight="bold" color="gray.400">
              English/Hindi
            </Text>
            <Text>Language</Text>
          </VStack>
        </Grid>

        {/* Footer */}
        <Grid templateColumns="1fr auto" mt={12} alignItems="center">
          <Link color="orange.400" to={"/contact"}>
            Talk to Our Counsellor
          </Link>
          <Link to={"/contact"}>
           <Button colorScheme="orange">Contact Us Here</Button>
          </Link>
        </Grid>
      </Box>
      <CourseAbout CourseTitle={Course?.title} />
      <CourseDown />
    </>
  );
};

export default CourseDetail;

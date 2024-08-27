import React from "react";
import {
  Box,
  Button,
  Flex,
  Heading,
  Image,
  Stack,
  Text,
  Badge,
  Grid,
  VStack,
} from "@chakra-ui/react";
import { CheckCircleIcon } from "@chakra-ui/icons";

const CourseAbout = ({CourseTitle}) => {
  return (
    <Box bg="white" color="white" minH="100vh" px={16} pt={6}>
      {/* Course Benefits Section */}
      <Box
        maxW="auto"
        mx="2px"
        mt={3}
        bg="white"
        color="black"
        borderRadius="sm"
        px={10}
        py={16}
      >
        <Grid templateColumns={{ base: "1fr", md: "1.2fr 1fr" }}>
          <Stack>
            <VStack spacing={4} mb={12} align="start">
              <Flex align="center">
                <Box w="6px" h="50px" bg="red.500" mr={4} />
                <Heading size="lg" mb={4}>
                  About {CourseTitle}
                </Heading>
              </Flex>
            </VStack>
            <Text mb={8}>
              Get a wide range of perks from our Generative AI Courses with
              updated learning materials and resources. Become a data expert
              after completing the course, and master data science tools and
              techniques after completing the course.
            </Text>
            <Grid templateColumns={{ base: "1fr", md: "1fr 1fr" }} gap={6}>
              <Stack spacing={4}>
                <Flex alignItems="center">
                  <CheckCircleIcon color="green.500" mr={2} />
                  <Text>Industry Mentorship</Text>
                </Flex>
                <Text fontSize="sm">
                  Network with industry experts and get mentored by them
                </Text>

                <Flex alignItems="center">
                  <CheckCircleIcon color="green.500" mr={2} />
                  <Text>Interview Opportunities</Text>
                </Flex>
                <Text fontSize="sm">
                  Get interviews for desired roles in the top companies
                </Text>

                <Flex alignItems="center">
                  <CheckCircleIcon color="green.500" mr={2} />
                  <Text>Career Growth</Text>
                </Flex>
                <Text fontSize="sm">
                  Get opportunities to elevate and fast-track your career
                </Text>
              </Stack>

              <Stack spacing={3}>
                <Flex alignItems="center">
                  <CheckCircleIcon color="green.500" mr={2} />
                  <Text>Project Portfolio</Text>
                </Flex>
                <Text fontSize="sm">
                  Build a job-ready profile with a dynamic project portfolio
                </Text>

                <Flex alignItems="center">
                  <CheckCircleIcon color="green.500" mr={2} />
                  <Text>Alumni Network</Text>
                </Flex>
                <Text fontSize="sm">
                  Leverage high-impact alumni network of PW Skills learners
                </Text>

                <Flex alignItems="center">
                  <CheckCircleIcon color="green.500" mr={2} />
                  <Text>Certification</Text>
                </Flex>
                <Text fontSize="sm">
                  Attain industry-renowned certificates for internship and
                  course completion
                </Text>
              </Stack>
            </Grid>
          </Stack>
          <Stack
            pt={10}
            alignItems="center"
            justifyContent="center"
            justifySelf="end"
          >
            <Box>
              <Image
                src="https://s3.ap-south-1.amazonaws.com/cdn.pwskills.com/assets/uploads/about/a36ff36c-26e8-4f15-8fd6-9fc890bcbfda.jpeg"
                alt="Data Science With Generative AI"
                borderRadius="md"
              />
            </Box>
          </Stack>
        </Grid>

        {/* Statistics Section */}
        <Grid
          templateColumns={{ base: "1fr", md: "repeat(3, 1fr)" }}
          gap={6}
          mt={12}
        >
          <Box textAlign="center" bg={"gray.100"} py={3} borderRadius="md">
            <Image
              src="https://pwskills.com/images/courseDescription/hiringPartnerIcon.svg"
              mx="auto"
            />
            <Text fontSize="lg" fontWeight="bold" mt={4}>
              300+
            </Text>
            <Text fontSize="sm">Hiring Partners</Text>
          </Box>
          <Box textAlign="center" bg={"gray.100"} py={3} borderRadius="md">
            <Image
              src="https://pwskills.com/images/courseDescription/careerTransitionIcon.svg"
              mx="auto"
            />
            <Text fontSize="lg" fontWeight="bold" mt={4}>
              4600+
            </Text>
            <Text fontSize="sm">Career Transitions</Text>
          </Box>
          <Box textAlign="center" bg={"gray.100"} py={3} borderRadius="md">
            <Image
              src="https://pwskills.com/images/courseDescription/highestSalaryIcon.svg"
              mx="auto"
            />
            <Text fontSize="lg" fontWeight="bold" mt={4}>
              47 Lakhs+
            </Text>
            <Text fontSize="sm">Highest Package</Text>
          </Box>
        </Grid>
      </Box>
    </Box>
  );
};

export default CourseAbout;

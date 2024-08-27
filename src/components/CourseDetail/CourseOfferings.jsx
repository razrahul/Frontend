import React from "react";
import {
  Box,
  Grid,
  Heading,
  VStack,
  HStack,
  Text,
  Icon,
  Flex,
} from "@chakra-ui/react";
import { FaProjectDiagram, FaClipboardList, FaUserTie, FaComments, FaCode, FaAward, FaUsers, FaEnvelope, FaClipboardCheck, FaNetworkWired } from "react-icons/fa";

const CourseOfferings = () => {
  return (
    <Box bg="white" py={12} px={10} mx={12}>
      <VStack spacing={4} mb={12} align="start">
        <Flex align="center">
          <Box w="6px" h="50px" bg="red.500" mr={4} />
          <Heading size="lg" color="black">
            Unlock Your Potential: Exclusive Course Offerings
          </Heading>
        </Flex>
      </VStack>

      <Grid templateColumns={["1fr", "1fr 1fr 1fr 1fr"]} gap={6}>
        <Box p={4} borderWidth={1} borderRadius="md" boxShadow="sm" bg="white">
          <HStack>
            <Icon as={FaProjectDiagram} w={6} h={6} color="blue.500" />
            <Text fontSize="md" color="black">
              Diverse Project Portfolio + 
            </Text>
          </HStack>
        </Box>

        <Box p={4} borderWidth={1} borderRadius="md" boxShadow="sm" bg="white" >
          <HStack >
            <Icon as={FaClipboardList} w={6} h={6} color="orange.500" />
            <Text fontSize="md"  color="black" >
              Practice Exercises
            </Text>
          </HStack>
        </Box>

        <Box p={4} borderWidth={1} borderRadius="md" boxShadow="sm" bg="white">
          <HStack>
            <Icon as={FaComments} w={6} h={6} color="purple.500" />
            <Text fontSize="md"  color="black">
              Doubt Clearing Sessions
            </Text>
          </HStack>
        </Box>

        <Box p={4} borderWidth={1} borderRadius="md" boxShadow="sm" bg="white">
          <HStack>
            <Icon as={FaCode} w={6} h={6} color="teal.500" />
            <Text fontSize="md"  color="black">
               CB Lab For Coding
            </Text>
          </HStack>
        </Box>

        <Box p={4} borderWidth={1} borderRadius="md" boxShadow="sm" bg="white">
          <HStack>
            <Icon as={FaAward} w={6} h={6} color="yellow.500" />
            <Text fontSize="md"  color="black">
              Industry Oriented Curriculum
            </Text>
          </HStack>
        </Box>

        <Box p={4} borderWidth={1} borderRadius="md" boxShadow="sm" bg="white">
          <HStack>
            <Icon as={FaClipboardCheck} w={6} h={6} color="red.500" />
            <Text fontSize="md"  color="black">
              Industry Recognized Certificate
            </Text>
          </HStack>
        </Box>

        <Box p={4} borderWidth={1} borderRadius="md" boxShadow="sm" bg="white">
          <HStack>
            <Icon as={FaUserTie} w={6} h={6} color="green.500" />
            <Text fontSize="md"  color="black">
              Instructor Led Sessions
            </Text>
          </HStack>
        </Box>

        <Box p={4} borderWidth={1} borderRadius="md" boxShadow="sm" bg="white">
          <HStack>
            <Icon as={FaNetworkWired} w={6} h={6} color="cyan.500" />
            <Text fontSize="md" color="black">
              Community Networking
            </Text>
          </HStack>
        </Box>

        <Box p={4} borderWidth={1} borderRadius="md" boxShadow="sm" bg="white">
          <HStack>
            <Icon as={FaUsers} w={6} h={6} color="pink.500" />
            <Text fontSize="md"  color="black">
              Interview Opportunities
            </Text>
          </HStack>
        </Box>

        <Box p={4} borderWidth={1} borderRadius="md" boxShadow="sm" bg="white">
          <HStack>
            <Icon as={FaClipboardCheck} w={6} h={6} color="purple.500" />
            <Text fontSize="md"  color="black">
              Module Level Assignments
            </Text>
          </HStack>
        </Box>

        <Box p={4} borderWidth={1} borderRadius="md" boxShadow="sm" bg="white">
          <HStack>
            <Icon as={FaEnvelope} w={6} h={6} color="blue.500" />
            <Text fontSize="md" color="black">
              Email Support
            </Text>
          </HStack>
        </Box>

        <Box p={4} borderWidth={1} borderRadius="md" boxShadow="sm" bg="white">
          <HStack>
            <Icon as={FaComments} w={6} h={6} color="green.500" />
            <Text fontSize="md" color="black">
              Q&A Forum
            </Text>
          </HStack>
        </Box>
      </Grid>
    </Box>
  );
};

export default CourseOfferings;

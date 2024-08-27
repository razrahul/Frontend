import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Heading,
  Text,
  Box,
  Button,
  TableContainer,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  TableCaption,
} from "@chakra-ui/react";
import { m } from "framer-motion";

function OpenSubscriptionItem({ isOpen, onClose, user, loading, courses }) {

  const CourseHandler = (id) => {
    const course = courses.find((course) => course._id === id);
    return course ? course.title : "Not Found";
  };

  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    const formattedDate = new Intl.DateTimeFormat('en-US', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
      hour12: true,
    }).format(date);
  //  console.log(formattedDate)
    // Split the formatted date into parts
    const [datePart, timePart] = formattedDate.split(' at ');
    const [monthday, year] = datePart.split(',');
    const [month, day] = monthday.split(' ');
    
    // Return the formatted string with "At" capitalized
    return `${day} ${month} ${year}, At ${timePart}`;
  };
  
  
  

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size="full"
      scrollBehavior="outside"
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          <Heading
            textTransform={"uppercase"}
            children="Subscription Details"
            mt="10"
            textAlign={["center", "left"]}
          />
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          {/* Render detailed subscription information here */}
          <Box mb="4">
            <Text fontWeight="bold" fontSize="lg">
              Subscription information for the user:{" "}
              <Text as="span" color="blue.600" textTransform={"uppercase"}>
                {user.name}
              </Text>
            </Text>
            <Text fontWeight="bold">User_ID: {user._id}</Text>
            <Text fontWeight="bold">Email: {user.email}</Text>
            <Text fontWeight="bold">Role: {user.role}</Text>
            <Text fontWeight="bold">
              Created At: {formatDate(user.createdAt)}
            </Text>
          </Box>

          {user.role === "admin" ? (
            <Heading
              textTransform={"uppercase"}
              children="Admin has access to all subscriptions."
              my="20"
              textAlign={"center"}
            />
          ) : (
            <>
              {/* Check if user.subscription exists and is an array */}
              {Array.isArray(user.subscription) &&
              user.subscription.length > 0 ? (
                <TableContainer w={["100vw", "full"]}>
                  <Table variant="simple" size="lg">
                    <TableCaption>
                      All available user subscriptions in the database
                    </TableCaption>
                    <Thead>
                      <Tr>
                        <Th> ID</Th>
                        <Th>Course ID</Th>
                        <Th>Course Name</Th>
                        <Th>Status</Th>
                        <Th>Order ID</Th>
                      </Tr>
                    </Thead>
                    <Tbody>
                      {user.subscription.map((sub) => (
                        <Tr key={sub._id}>
                          <Td>#{sub._id}</Td>
                          <Td>{sub.course}</Td>
                          <Td>{CourseHandler(sub.course)}</Td>
                          <Td>{sub.status}</Td>
                          <Td>{sub.id}</Td>
                        </Tr>
                      ))}
                    </Tbody>
                  </Table>
                </TableContainer>
              ) : (
                <Heading
                  textTransform={"uppercase"}
                  children="No subscription data available."
                  my="20"
                  textAlign={"center"}
                />
              )}
            </>
          )}
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={onClose}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default OpenSubscriptionItem;

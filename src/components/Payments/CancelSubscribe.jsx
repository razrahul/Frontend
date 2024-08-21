import { useNavigate } from 'react-router-dom'
import {
  Box,
  Button,
  Container,
  Heading,
  Text,
  VStack,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import logo from "../../assets/images/logo.png";
import { server } from "../../redux/store";
import { buySubscription, cancelSubscription } from "../../redux/actions/subscription";
import { toast } from "react-toastify";
import { getAllCourses } from "../../redux/actions/course";

const CancelSubscribe = ({ user }) => {
  const { courses } = useSelector((state) => state.course);
  const params = useParams();
  const dispatch = useDispatch();
  const [key, setKey] = useState("");
  const { loading, error,message, subscriptionId } = useSelector((state) => state.subscription);

  const { isOpen, onOpen, onClose } = useDisclosure();


  useEffect(() => {
    dispatch(getAllCourses());
  }, [dispatch]);
  
  useEffect(() => {
    setData(courses);
  }, [courses]);

  
  const [data, setData ]= useState([]);

  const Course = data.length>0 && data?.find((course) => course?._id === params?.id);
  
  // console.log(data)
  // console.log(Course)
  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch({ type: 'clearError' });
    }
    if (message) {
      toast.success(message);
      dispatch({ type: 'clearMessage' });
    }
    
  }, [
    error,message
  ]);

  const navigate = useNavigate();

  const cancelSubscriptionHandler = async() => {
   await dispatch(cancelSubscription(params.id, Course.price, "INR")) 
    toast.success("Subscription cancelled successfully");
    onClose();
    // navigate("/mycourses");
  };

  return (
    <Container h="90vh" p="16" mb="8">
      <Heading children="Subscription Details" my="8" textAlign={"center"} />

      {Course   ? (
        <VStack
          boxShadow={"lg"}
          alignItems="stretch"
          borderRadius={"lg"}
          spacing="0"
        >
          <Box bg="yellow.400" p={"4"} css={{ borderRadius: "8px 8px 0 0" }}>
            <Text color={"black"} children={`Mega Pack - ₹${Course.price}.00`} />
          </Box>
          <Box p="4">
            <VStack textAlign={"center"} px="2" mt={"4"} spacing="4">
              <Text children={`Join Mega pack and get access to all lectures.`} />
              <Text as="b" size="xs" textTransform="uppercase" children={`${Course.title}.`} />
              <Text size="lg" children={`${Course.category}.`} />
              <Heading size="md" children={`₹${Course.price} Only`} />
            </VStack>

            <Button
              my="8"
              w="full"
              colorScheme={"red"}
              onClick={onOpen}
              isLoading={loading}
            >
              Cancel Subscription
            </Button>
          </Box>

          <Box bg="blackAlpha.600" p="4" css={{ borderRadius: "0 0 8px 8px" }}>
            <Heading
              color={"white"}
              textTransform="uppercase"
              size="sm"
              children={"100% refund at cancellation"}
            />

            <Text
              fontSize={"xs"}
              color="white"
              children={"*Terms & Conditions Apply"}
            />
          </Box>
        </VStack>
      ) : (
        <Heading children="Course not found" my="8" textAlign={"center"} />
      )}

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Cancel Subscription</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>Are you sure you want to cancel your subscription? This action cannot be undone.</Text>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="red" mr={3} onClick={cancelSubscriptionHandler}>
              Yes, Cancel
            </Button>
            <Button variant="ghost" onClick={onClose}>
              No, Keep it
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Container>
  );
};

export default CancelSubscribe;

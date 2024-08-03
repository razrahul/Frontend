import {
  Avatar,
  Button,
  Container,
  Heading,
  HStack,
  Image,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
  Text,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import React, { useEffect } from "react";
import { useState } from "react";
import { toast } from "react-toastify";
import { RiDeleteBin7Fill } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { fileUploadCss } from "../Auth/Register";
import {
  updateProfilePicture,
  removeFormPlaylist,
} from "../../redux/actions/profile";
import { loadUser } from "../../redux/actions/user";

const Profile = ({ user }) => {
  //dayanomacally

  // const user ={
  //   name:"RAhul  Kumar",
  //   email:"raz@test.com",
  //   createdAt: String(new Date().toISOString()),
  //   role: "user",
  //   subscription:{
  //     status:undefined,
  //   },
  //   playlist:[
  //   {
  //     course:"wjac",
  //     poster:'https://images.pexels.com/photos/546819/pexels-photo-546819.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
  //   },
  //   {
  //     course:"wjac",
  //     poster:'https://images.pexels.com/photos/546819/pexels-photo-546819.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
  //   },
  //   {
  //     course:"wjac",
  //     poster:'https://images.pexels.com/photos/546819/pexels-photo-546819.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
  //   },
  //   {
  //     course:"wjac",
  //     poster:'https://images.pexels.com/photos/546819/pexels-photo-546819.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
  //   }
  //  ]
  // }

  const dispatch = useDispatch();
  const { loading, message, error } = useSelector((state) => state.profile);

  const removeFromPlaylistHandler = async (id) => {
    console.log(id);
    await dispatch(removeFormPlaylist(id));
    dispatch(loadUser());
  };

  const changeImageSubmitHandler = async (e, image) => {
    e.preventDefault();
    // console.log(image)
    const myForm = new FormData();
    myForm.append("file", image);
    await dispatch(updateProfilePicture(myForm));
    dispatch(loadUser());
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
    if (message) {
      toast.success(message);
    }
  }, [dispatch]);

  const cancelSubscriptionHandler = () => {};

  const { isOpen, onClose, onOpen } = useDisclosure();

  return (
    <Container minH={"95vh"} maxW="container.lg" py="8">
      <Heading children="Profile" m="8" textTransform={"uppercase"} />

      <Stack
        justifyContent={"flex-start"}
        direction={["column", "row"]}
        alignItems={"center"}
        spacing={["8", "16"]}
        padding="8"
      >
        <VStack>
          {/* //src={user.avatar.url} */}
          <Avatar boxSize={"48"} src={user.avatar.url} />
          <Button onClick={onOpen} colorScheme={"yellow"} variant="ghost">
            Change Photo
          </Button>
        </VStack>

        <VStack spacing={"4"} alignItems={["center", "flex-start"]}>
          <HStack>
            <Text children="Name" fontWeight={"bold"} />
            <Text children={user.name} />
          </HStack>{" "}
          <HStack>
            <Text children="Email" fontWeight={"bold"} />
            <Text children={user.email} />
          </HStack>
          <HStack>
            <Text children="CreatedAt" fontWeight={"bold"} />
            <Text children={user.createdAt.split("T")[0]} />
          </HStack>
          {user.role !== "admin" && (
            <HStack>
              <Text children="Subscription" fontWeight={"bold"} />
              {user.subscription && user.subscription.status === "active" ? (
                <Button
                  // isLoading={subscriptionLoading}
                  onClick={cancelSubscriptionHandler}
                  color={"yellow.500"}
                  variant="unstyled"
                >
                  Cancel Subscription
                </Button>
              ) : (
                <Link to="/subscribe">
                  <Button colorScheme={"yellow"}>Subscribe</Button>
                </Link>
              )}
            </HStack>
          )}
          <Stack direction={["column", "row"]} alignItems={"center"}>
            <Link to="/updateprofile">
              <Button>Update Profile</Button>
            </Link>

            <Link to="/changepassword">
              <Button>Change Password</Button>
            </Link>
          </Stack>
        </VStack>
      </Stack>

      <Heading children="Playlist" size={"md"} my="8" />

      {user.playlist.length > 0 && (
        <Stack
          direction={["column", "row"]}
          alignItems={"center"}
          flexWrap="wrap"
          p="4"
        >
          {user.playlist.map((element) => (
            <VStack
              className="course"
              alignItems={["center", "flex-start"]}
              spacing={4}
              p={4}
              // borderWidth="1px"
              // borderRadius="md"
              // boxShadow="md"
              width={["full", "300px"]}
              key={element.course}
            >
              <Image
                // boxSize={'full'}
                src={element.poster}
                width="100%"
                height="220px"
                objectFit="cover"
                borderRadius="md"
              />

              <HStack>
                <Link to={`/course/${element.course}`}>
                  <Button variant={"ghost"} colorScheme="yellow">
                    Watch Now
                  </Button>
                </Link>

                <Button
                  isLoading={loading}
                  onClick={() => removeFromPlaylistHandler(element.course)}
                >
                  <RiDeleteBin7Fill />
                </Button>
              </HStack>
            </VStack>
          ))}
        </Stack>
      )}

      <ChangePhotoBox
        changeImageSubmitHandler={changeImageSubmitHandler}
        isOpen={isOpen}
        onClose={onClose}
        loading={loading}
      />
    </Container>
  );
};

export default Profile;

function ChangePhotoBox({
  isOpen,
  onClose,
  changeImageSubmitHandler,
  loading,
}) {
  const [image, setImage] = useState("");
  const [imagePrev, setImagePrev] = useState("");

  const changeImage = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.readAsDataURL(file);

    reader.onloadend = () => {
      setImagePrev(reader.result);
      setImage(file);
    };
  };

  const closeHandler = () => {
    onClose();
    setImagePrev("");
    setImage("");
  };
  return (
    <Modal isOpen={isOpen} onClose={closeHandler}>
      <ModalOverlay backdropFilter={"blur(10px)"} />
      <ModalContent>
        <ModalHeader>Change Photo</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Container>
            <form onSubmit={(e) => changeImageSubmitHandler(e, image)}>
              <VStack spacing={"8"}>
                {imagePrev && <Avatar src={imagePrev} boxSize={"48"} />}

                <Input
                  type={"file"}
                  css={{ "&::file-selector-button": fileUploadCss }}
                  onChange={changeImage}
                />

                <Button
                  isLoading={loading}
                  w="full"
                  colorScheme={"yellow"}
                  type="submit"
                >
                  Change
                </Button>
              </VStack>
            </form>
          </Container>
        </ModalBody>

        <ModalFooter>
          <Button mr="3" onClick={closeHandler}>
            Cancel
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

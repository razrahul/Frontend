import {
  Box,
  Button,
  Grid,
  Heading,
  HStack,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Center,
  Text,
  Image
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { RiDeleteBin7Fill } from 'react-icons/ri';
import cursor from '../../../assets/images/cursor.png';
import Sidebar from '../Sidebar';
import { useDispatch, useSelector } from 'react-redux';
import { getAllUsers, updateUserRole, deleteUser } from '../../../redux/actions/admin';
import { toast } from 'react-toastify';
import OpenSubscriptionItem from './SubcriptionItem';

const Users = () => {
  //dayanimally
  // const users =[
  //   {
  //     _id: "thchdc",
  //     name: 'John Doe',
  //     email: 'john@example.com',
  //     role: 'admin',
  //     subscription: {
  //       status: 'active',
  //       plan: 'premium',
  //     },
  //   },
  // ]
  const { users, loading, error, message } = useSelector((state) => state.admin);
  const dispatch = useDispatch();

  const { isOpen, onClose, onOpen } = useDisclosure();
  const [selectedUser, setSelectedUser] = useState(null); 

  const updateHandler = (userId) => {
    dispatch(updateUserRole(userId, onResponse));
  };

  const deleteButtonHandler = (userId) => {
    dispatch(deleteUser(userId, onResponse));
  };

  const onResponse = () => {
    if (error) {
      toast.error(error);
      dispatch({ type: 'clearError' });
    } else if (message) {
      toast.success(message);
      dispatch({ type: 'clearMessage' });
    }

    dispatch(getAllUsers());
  };

  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);

  const openSubscriptionHandler = (user) => {
    setSelectedUser(user); // Set the selected user
    onOpen(); // Open the modal
  };

  return (
    <Grid
      css={{
        cursor: `url(${cursor}), default`,
      }}
      minH={'100vh'}
      templateColumns={['1fr', '5fr 1fr']}
    >
      <Box p={['0', '16']} overflowX="auto">
        <Heading
          textTransform={'uppercase'}
          children="All Users"
          my="16"
          textAlign={['center', 'left']}
        />

        <TableContainer w={['100vw', 'full']}>
          <Table variant={'simple'} size="lg">
            <TableCaption>All available users in the database</TableCaption>

            <Thead>
              <Tr>
                <Th>Id</Th>
                <Th>Avatar</Th>
                <Th>Name</Th>
                <Th>Email</Th>
                <Th>Role</Th>
                <Th>Subscription</Th>
                <Th isNumeric>Action</Th>
              </Tr>
            </Thead>

            <Tbody>
              {users &&
                users.map((item) => (
                  <Row
                    key={item._id}
                    item={item}
                    updateHandler={updateHandler}
                    deleteButtonHandler={deleteButtonHandler}
                    openSubscriptionHandler={openSubscriptionHandler} // Pass the handler
                    loading={loading}
                  />
                ))}
            </Tbody>
          </Table>
        </TableContainer>

        {/* Render only one modal */}
        {selectedUser && (
          <OpenSubscriptionItem
            isOpen={isOpen}
            onClose={onClose}
            user={selectedUser} // Pass selected user
            loading={loading}
          />
        )}
      </Box>

      <Sidebar />
    </Grid>
  );
};

export default Users;

function Row({ item, updateHandler, deleteButtonHandler, openSubscriptionHandler, loading }) {
  return (
    <Tr>
      <Td>#{item._id}</Td>
      <Td>
        <Image src={item.avatar.url} boxSize={'60px'} borderRadius={'10px'} />
      </Td>
      <Td>{item.name}</Td>
      <Td>{item.email}</Td>
      <Td>{item.role}</Td>
      <Td isNumeric>
        <HStack justifyContent={'flex-end'}>
          <Button
            onClick={() => openSubscriptionHandler(item)} // Pass entire user object
            variant={'outline'}
            color="blue.500"
            isLoading={loading}
          >
            Open Subscription
          </Button>
        </HStack>
      </Td>

      <Td isNumeric>
        <HStack justifyContent={'flex-end'}>
          <Button
            onClick={() => updateHandler(item._id)}
            variant={'outline'}
            color="purple.500"
            isLoading={loading}
          >
            Change Role
          </Button>

          <Button
            onClick={() => deleteButtonHandler(item._id)}
            color={'purple.600'}
            isLoading={loading}
          >
            <RiDeleteBin7Fill />
          </Button>
        </HStack>
      </Td>
    </Tr>
  );
}

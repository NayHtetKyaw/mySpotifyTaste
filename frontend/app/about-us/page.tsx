import React from 'react'
import { Container,Flex,Title,Text,Divider,Stack,TextInput,Button,Box,Group } from '@mantine/core'
import Link from 'next/link'

export default function page() {
  return (
    <Container>
      <Flex direction="column" align="center" >
        <Title mb="md" c="white">
          About Us
        </Title>
        <Text  size="md" c="white">
          We provide insightful statistics and analytics for your Spotify
          listening experience. Empowering music lovers with detailed statistics
          on their Spotify habits, helping them discover new music, and
          enhancing their listening experience.
        </Text>
      </Flex>

      <Divider my="md" />

      <Flex direction="column" justify="center" gap="lg">
        <Title order={2} c="white" className="text-center">
          Contact our team
        </Title>   

      <Group gap="xl">
        <TextInput
          label="First Name"
          placeholder="First name"
          radius="md"
          size="md"
          styles={{
            input: {
              backgroundColor: '#f0f0f0', 
              width : '300px'
            },
            label:{
              marginBottom: '0.5rem'
            }
          }}
        />
        <TextInput
          label="Last Name"
          placeholder="Last name"
          radius="md"
          size="md"
          styles={{
            input: {
              backgroundColor: '#f0f0f0', 
              width : '300px'
            },
            label:{
              marginBottom: '0.5rem'
            }
          }}
        />
        
        </Group> 
        <TextInput
            label="Email"
            placeholder="youremail@gmail.com"
            radius="md"
            size="md"
            styles={{
              input: {
                backgroundColor: '#f0f0f0', 
                width : '400px'
              },
              label:{
                marginBottom: '0.5rem'
              }
            }}
          />
          <TextInput
            label="Phone Number"
            placeholder="Phone number"
            radius="md"
            size="md"
            styles={{
              input: {
                backgroundColor: '#f0f0f0', 
                width : '400px'
              },
              label:{
                marginBottom: '0.5rem'
              }
            }}
          />
          <center>
          <Link href="/sendMessages">
            <Button color="white" radius="xl" size="md" 
            style={{ width: '500px',
            color: 'black',
          }}>
                Send Messages
            </Button>
          </Link>
          </center>
      </Flex>
    </Container>
  )
}

import { Container } from "@mantine/core";

export default function ProfileSetting() {
    return (
       
  <Container className="m-3" fluid>
    <div >
        <h2 className="text-3xl font-semibold mb-4"> Hello, {"{USER}"}</h2>
        <img
              src="/assets/images/myspotifytaste.png"
              alt="Profile Picture" 
              className="w-32 h-32 rounded-full mb-4"
            />
    </div>

    <div className="p-6 bg-custom-bg text-white rounded-lg mb-4">
        <h3 className="text-xl font-semibold">Spotify Account </h3>
            <p className="mt-1 text-sm">The Spotify account that you are signed in with.</p>
            <div className="mt-9">
              <p><span className="font-bold">User name:</span> </p>
              <p>vickyB1456</p>
              <p><span className="font-bold">Access Level:</span></p>
              <p> Basic</p>
            </div>
    </div>

    <div className="p-6 bg-custom-bg text-white rounded-lg mb-4 ">
        <h3 className="text-xl font-semibold">Email </h3>
            <p className="mt-1 text-sm">The email address assosiated with your account.</p>
            <p className="font-bold mt-2">vickyyang2345@gmail.com</p>
    </div>

    <div className= "p-6 bg-custom-bg text-white rounded-lg">
        <h3 className="text-xl font-semibold">Plan</h3>
            <p className="text-sm">Upgrade your plan and unlock all your great features</p>
            <p className="font-bold mt-2">You are currently on the basic plan.</p>
    </div>

    <div className="p-6 bg-custom-bg text-white rounded-lg mt-4">
        <h3 className="text-xl font-semibold">Subscription</h3>
        <p className="text-sm">Visit the Billing Portal to view your invoices, manage your cards, or cancel your subscription.</p>
        <button className="mt-2 py-2 px-4 bg-white text-black rounded-3xl hover:bg-gray-600">Billing Portal</button>

        <div className="mt-4">
            <h3 className="text-xl font-semibold">Sign Out</h3>
            <p className="text-sm">Sign out of your account on this browser</p>
            <a href="/">
            <button className="mt-2 py-2 px-4 bg-white text-black rounded-3xl hover:bg-gray-600">Sign Out</button>
            </a>
        </div>
    </div>

    <footer className="flex justify-center">
        <button className="px-4 py-2 bg-white text-black rounded-3xl hover:bg-red-600 mt-4 mb-4">Delete Account</button>
    </footer>

  </Container>   
    );
  }
  
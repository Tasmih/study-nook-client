"use client";

import { Button, Input, Label, Modal, Surface } from "@heroui/react";

import { FaEdit } from "react-icons/fa";


export function UpdateModal({ room }) {

  const {
    _id,
    image,
    roomName,
    description,
    floor,
    capacity,
    hourlyRate,
    amenities,
  } = room;

  const onSubmit = async (e) => {
    e.preventDefault();
     const {token} = await auth.api.getToken({
        headers:await headers()
      })

    const formData = new FormData(e.currentTarget);
   
    const room = {
      roomName: formData.get("roomName"),
      floor: formData.get("floor"),
      capacity: formData.get("capacity"),
      hourlyRate: formData.get("hourlyRate"),
      image: formData.get("image"),
      description: formData.get("description"),
      amenities: formData.getAll("amenities"),
    };

    console.log("ROOM DATA:", room);
     console.log("ROOM DATA:", room);

    const res =await fetch(`http://localhost:5000/room/${_id}`,{
      method:'PATCH',
      headers:{
        'content-type':'application/json',
         authorization: `Bearer ${token}`
      },
      body:JSON.stringify(room)
    })
    const data = await res.json()
    if (res.ok) {
    setOpen(false); 
}
    console.log (data)
  
  };

  return (
    <Modal>
      <Button className="flex w-[170px] items-center justify-center gap-2 rounded-xl bg-[#d8a84f] px-6 py-3 font-semibold text-[#0f172a] shadow-md transition duration-300 hover:bg-[#c99732]">
        <FaEdit className="text-sm" />
         Update Room
      </Button>

      <Modal.Backdrop>
        <Modal.Container placement="center">
          <Modal.Dialog className="w-[95%] max-w-2xl bg-[#0f172a] text-white border border-gray-700 rounded-2xl">

            <Modal.CloseTrigger />


            <Modal.Header className="flex flex-col gap-2">
              <Modal.Icon className="bg-[#1f2937] text-yellow-400">
                <FaEdit className="size-5" />
              </Modal.Icon>

              <Modal.Heading className="text-white font-bold text-xl md:text-2xl">
                Update Room
              </Modal.Heading>
            </Modal.Header>

  
            <Modal.Body className="p-4 md:p-6">
              <Surface className="bg-[#0f172a] text-white">

                <form onSubmit={onSubmit} className="space-y-6">

        
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">

                    <div>
                      <Label className="text-gray-200 mb-1 block">
                        Room Name
                      </Label>
                      <Input defaultValue={roomName} name="roomName" />
                    </div>

                    <div>
                      <Label className="text-gray-200 mb-1 block">
                        Floor
                      </Label>
                      <Input defaultValue={floor} name="floor" />
                    </div>

                  </div>

          
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">

                    <div>
                      <Label className="text-gray-200 mb-1 block">
                        Capacity
                      </Label>
                      <Input defaultValue={capacity} name="capacity" type="number" />
                    </div>

                    <div>
                      <Label className="text-gray-200 mb-1 block">
                        Hourly Rate
                      </Label>
                      <Input defaultValue={hourlyRate} name="hourlyRate" type="number" />
                    </div>

                  </div>

            
                  <div>
                    <Label className="text-gray-200 mb-1 block">
                      Image URL
                    </Label>
                    <Input defaultValue={image} name="image" />
                  </div>

                  <div>
                    <Label className="text-gray-200 mb-1 block">
                      Description
                    </Label>

                    <textarea
                      defaultValue={description}
                      name="description"
                      className="border border-gray-600 bg-[#111827] text-white rounded-xl p-3 w-full min-h-[100px]"
                    />
                  </div>

            
                  <div>
                    <Label className="text-gray-200 mb-2 block">
                      Amenities
                    </Label>

                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 md:gap-3 mt-2">

                      {[
                        "Wi-Fi",
                        "Whiteboard",
                        "Projector",
                        "Power Outlets",
                        "Quiet Zone",
                        "AC",
                      ].map((item) => (
                        <label
                          key={item}
                          className="flex items-center gap-2 border border-gray-600 px-3 py-2 rounded-lg text-sm"
                        >
                          <input
                            type="checkbox"
                            name="amenities"
                            value={item}
                            defaultChecked={amenities?.includes(item)}
                          />
                          {item}
                        </label>
                      ))}

                    </div>
                  </div>

            
                  <Button
                    type="submit"
                    className="w-full bg-yellow-500 text-black font-semibold py-3 rounded-xl hover:bg-yellow-400 transition"
                  >
                    Update Room
                  </Button>



                </form>
                

              </Surface>
            </Modal.Body>

    
            <Modal.Footer className="flex justify-end p-4 border-t border-gray-700">
              <Button slot="close" variant="secondary">
                Cancel
              </Button>
              
            </Modal.Footer>

          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal>
  );
}
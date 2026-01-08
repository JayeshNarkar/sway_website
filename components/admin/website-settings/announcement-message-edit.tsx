"use client";
import { AnnouncementMessage } from "@/lib/prisma";
import { useState } from "react";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "@hello-pangea/dnd";
import editAnnouncementMessages from "./edit-announcement-messages";
import { Input } from "@/components/ui/input";

interface AnnouncementMessageEditProps {
  messages: AnnouncementMessage[];
}
interface ApiResponse {
  success: boolean;
  message: string;
  count?: number;
}

export default function AnnouncementMessageEdit({
  messages,
}: AnnouncementMessageEditProps) {
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState<ApiResponse | null>(null);
  const [announcements, setAnnouncements] =
    useState<AnnouncementMessage[]>(messages);
  const [newMessage, setNewMessage] = useState("");
  const [nextSortOrder, setNextSortOrder] = useState(
    announcements.length > 0
      ? Math.max(...announcements.map((a) => a.sortOrder)) + 1
      : 1
  );

  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    const items = Array.from(announcements);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    const updatedItems = items.map((item, index) => ({
      ...item,
      sortOrder: index + 1,
    }));

    setAnnouncements(updatedItems);
    setNextSortOrder(updatedItems.length + 1);
  };

  const updateMessage = (
    id: number,
    field: keyof AnnouncementMessage,
    value: string | number
  ) => {
    setAnnouncements((prev) =>
      prev.map((msg) => (msg.id === id ? { ...msg, [field]: value } : msg))
    );
  };

  const addMessage = () => {
    if (!newMessage.trim()) return;

    const newId =
      announcements.length > 0
        ? Math.max(...announcements.map((a) => a.id)) + 1
        : 1;

    const message: AnnouncementMessage = {
      id: newId,
      message: newMessage,
      sortOrder: nextSortOrder,
      createdAt: new Date(),
    };

    setAnnouncements((prev) => [...prev, message]);
    setNewMessage("");
    setNextSortOrder(nextSortOrder + 1);
  };

  const deleteMessage = (id: number) => {
    setAnnouncements((prev) => {
      const filtered = prev.filter((msg) => msg.id !== id);

      return filtered.map((msg, index) => ({
        ...msg,
        sortOrder: index + 1,
      }));
    });
    setNextSortOrder((prev) => prev - 1);
  };

  return (
    <div className="pt-4">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-md font-bold">Announcement Messages</h2>
        <div className="text-sm text-gray-500">
          {announcements.length} message{announcements.length !== 1 ? "s" : ""}
        </div>
      </div>

      {/* Drag and Drop List */}
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="announcements">
          {(provided) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              className="space-y-3 mb-8"
            >
              {announcements.map((msg, index) => (
                <Draggable
                  key={msg.id}
                  draggableId={msg.id.toString()}
                  index={index}
                >
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      className="flex items-start bg-white border rounded-lg p-4"
                    >
                      {/* Drag Handle */}
                      <div
                        {...provided.dragHandleProps}
                        className="mr-4 mt-2 cursor-move text-gray-400"
                      >
                        ⋮⋮
                      </div>

                      {/* Content */}
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <Input
                            disabled={loading}
                            type="number"
                            value={msg.sortOrder}
                            onChange={(e) =>
                              updateMessage(
                                msg.id,
                                "sortOrder",
                                parseInt(e.target.value) || 1
                              )
                            }
                            className="w-20 px-2 py-1 border rounded text-center"
                            min="1"
                          />
                          <button
                            disabled={loading}
                            onClick={() => deleteMessage(msg.id)}
                            className="text-red-500 hover:text-red-700 text-sm font-medium"
                          >
                            Delete
                          </button>
                        </div>

                        <Input
                          disabled={loading}
                          value={msg.message}
                          onChange={(e) =>
                            updateMessage(msg.id, "message", e.target.value)
                          }
                          className="w-full px-3 py-2 border rounded-md"
                          placeholder="Message content"
                        />
                      </div>
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>

      {/* Add New Message */}
      <div className="bg-gray-50 border rounded-lg p-4 mb-6">
        <h3 className="font-semibold mb-3">Add New Message</h3>
        <textarea
          disabled={loading}
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          className="w-full px-3 py-2 border rounded-md mb-3"
          rows={3}
          placeholder="Enter new announcement message..."
        />
        <div className="flex justify-between items-center">
          <div className="text-sm text-gray-500">
            Will be added at position #{nextSortOrder}
          </div>
          <button
            onClick={addMessage}
            disabled={!newMessage.trim() || loading}
            className={`px-4 py-2 rounded ${
              newMessage.trim()
                ? "bg-blue-500 text-white hover:bg-blue-600"
                : "bg-gray-200 text-gray-400 cursor-not-allowed"
            }`}
          >
            Add Message
          </button>
        </div>
      </div>

      {/* Actions */}
      <div className="flex justify-end space-x-3">
        <button
          disabled={loading}
          onClick={() => setAnnouncements(messages)}
          className="px-4 py-2 border rounded hover:bg-gray-50"
        >
          Cancel
        </button>
        <button
          disabled={loading}
          onClick={async () => {
            setLoading(true);
            setResponse(await editAnnouncementMessages(announcements));
            setLoading(false);
            setTimeout(() => {
              setResponse(null);
            }, 10000);
          }}
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
        >
          Save Changes
        </button>
      </div>
      {response &&
        (response.success ? (
          <p className="text-center text-green-500 mt-2">{response.message}</p>
        ) : (
          <p className="text-center text-red-500 mt-2">{response.message}</p>
        ))}
    </div>
  );
}

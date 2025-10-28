import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { BASE_URL } from "../utils/config";
import "../styles/adminPanel.css";

const AdminPanel = () => {
  const { user } = useContext(AuthContext);
  const [activeTab, setActiveTab] = useState("tours");
  const [tours, setTours] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [users, setUsers] = useState([]);

  const token = localStorage.getItem("token");

  // 🔹 Fetch data depending on active tab
  useEffect(() => {
    if (!user || user.role !== "admin") return;

    const fetchData = async () => {
      try {
        if (activeTab === "tours") {
          const res = await fetch(`${BASE_URL}/tours`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          const data = await res.json();
          setTours(data.data || []);
        }

        if (activeTab === "bookings") {
          const res = await fetch(`${BASE_URL}/booking`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          const data = await res.json();
          setBookings(data.data || []);
        }

        if (activeTab === "users") {
          const res = await fetch(`${BASE_URL}/users`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          const data = await res.json();
          setUsers(data.data || []);
        }
      } catch (err) {
        console.error("Error loading admin data:", err);
      }
    };

    fetchData();
  }, [activeTab, user, token]);

  // 🔹 Delete function (works for all)
  const handleDelete = async (type, id) => {
    if (!window.confirm("Are you sure you want to delete this item?")) return;

    const url =
      type === "tour"
        ? `${BASE_URL}/tours/${id}`
        : type === "user"
        ? `${BASE_URL}/users/${id}`
        : `${BASE_URL}/booking/${id}`;

    try {
      const res = await fetch(url, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.ok) {
        alert(`${type} deleted successfully`);
        setActiveTab(activeTab); // reload current tab
      }
    } catch (err) {
      console.error("Delete failed:", err);
    }
  };

  if (!user || user.role !== "admin") {
    return <h3 className="text-center mt-5">Unauthorized Access 🚫</h3>;
  }

  return (
    <div className="admin-panel">
      <h2>👑 Admin Panel</h2>

      <div className="admin-tabs">
        <button
          className={activeTab === "tours" ? "active" : ""}
          onClick={() => setActiveTab("tours")}
        >
          Tours
        </button>
        <button
          className={activeTab === "bookings" ? "active" : ""}
          onClick={() => setActiveTab("bookings")}
        >
          Bookings
        </button>
        <button
          className={activeTab === "users" ? "active" : ""}
          onClick={() => setActiveTab("users")}
        >
          Users
        </button>
      </div>

      {/* 🔹 Tours Section */}
      {activeTab === "tours" && (
        <table className="admin-table">
          <thead>
            <tr>
              <th>Title</th>
              <th>City</th>
              <th>Price</th>
              <th>Max Group</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {tours.map((t) => (
              <tr key={t._id}>
                <td>{t.title}</td>
                <td>{t.city}</td>
                <td>${t.price}</td>
                <td>{t.maxGroupSize}</td>
                <td>
                  <button onClick={() => handleDelete("tour", t._id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* 🔹 Bookings Section */}
      {activeTab === "bookings" && (
        <table className="admin-table">
          <thead>
            <tr>
              <th>Tour</th>
              <th>User Email</th>
              <th>Guests</th>
              <th>Total</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((b) => (
              <tr key={b._id}>
                <td>{b.tourName}</td>
                <td>{b.userEmail}</td>
                <td>{b.guestSize}</td>
                <td>${b.totalAmount}</td>
                <td>{b.bookAt?.substring(0, 10)}</td>
                <td>
                  <button onClick={() => handleDelete("booking", b._id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* 🔹 Users Section */}
      {activeTab === "users" && (
        <table className="admin-table">
          <thead>
            <tr>
              <th>Username</th>
              <th>Email</th>
              <th>Role</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u._id}>
                <td>{u.username}</td>
                <td>{u.email}</td>
                <td>{u.role}</td>
                <td>
                  {u.role !== "admin" && (
                    <button onClick={() => handleDelete("user", u._id)}>
                      Delete
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AdminPanel;

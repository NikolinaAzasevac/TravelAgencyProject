import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { BASE_URL } from "../utils/config";
import "../styles/adminPanel.css";

const AdminPanel = () => {
  // ✅ Izračunava ukupnu cenu rezervacije na osnovu tura iz baze
  const calculatePrice = (tourName, guests) => {
    const tour = tours.find((t) => t.title === tourName);
    if (!tour) return 0;
    return tour.price * guests;
  };
  const { user } = useContext(AuthContext);
  const [activeTab, setActiveTab] = useState("tours");

  const [tours, setTours] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [users, setUsers] = useState([]);

  // MODAL state
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentId, setCurrentId] = useState(null);

  const [tourData, setTourData] = useState({
    title: "",
    city: "",
    address: "",
    distance: "",
    price: "",
    maxGroupSize: "",
    desc: "",
    hotel: "",
    photo: "",
    featured: false,
  });

  const token = localStorage.getItem("token");

  // ✅ Debug log
  useEffect(() => {
    console.log("🔁 Rerender AdminPanel | showModal:", showModal);
  });

  // ✅ Fetch data (sprečeno dok je modal otvoren)
  useEffect(() => {
    if (!user || user.role !== "admin") return;
    if (showModal) {
      console.log("⏸ Fetch paused because modal is open");
      return;
    }

    console.log("📦 Fetching data for:", activeTab);

    const fetchData = async () => {
      try {
        if (activeTab === "tours") {
          const res = await fetch(`${BASE_URL}/tours`);
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
  }, [activeTab, user, token, showModal]);

  // ✅ Open modal for add or edit
  const openModal = (edit = false, tour = null) => {
    setIsEditing(edit);
    console.log("🟢 Opening modal:", edit ? "Edit mode" : "Add mode");

    if (edit && tour) {
      setTourData({ ...tour });
      setCurrentId(tour._id);
    } else {
      setTourData({
        title: "",
        city: "",
        address: "",
        distance: "",
        price: "",
        maxGroupSize: "",
        desc: "",
        hotel: "",
        photo: "",
        featured: false,
      });
      setCurrentId(null);
    }

    setShowModal(true);
  };

  // ✅ Save or update tour
  const handleSave = async () => {
    if (!tourData.title || !tourData.city || !tourData.price) {
      alert("Please fill in Title, City and Price!");
      return;
    }

    const method = isEditing ? "PUT" : "POST";
    const url = isEditing
      ? `${BASE_URL}/tours/${currentId}`
      : `${BASE_URL}/tours`;

    try {
      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(tourData),
      });

      const result = await res.json();

      if (result.success) {
        alert(isEditing ? "✅ Tour updated!" : "✅ Tour added!");
        setShowModal(false);

        if (isEditing) {
          setTours((prev) =>
            prev.map((t) => (t._id === currentId ? result.data : t))
          );
        } else {
          setTours((prev) => [...prev, result.data]);
        }
      } else {
        alert(result.message || "Failed to save tour");
      }
    } catch (err) {
      console.error("Error saving tour:", err);
    }
  };

  // ✅ Delete
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
        if (type === "tour")
          setTours((prev) => prev.filter((t) => t._id !== id));
        if (type === "user")
          setUsers((prev) => prev.filter((u) => u._id !== id));
        if (type === "booking")
          setBookings((prev) => prev.filter((b) => b._id !== id));
      }
    } catch (err) {
      console.error("Delete failed:", err);
    }
  };

  // Unauthorized guard
  if (!user || user.role !== "admin") {
    return <h3 className="text-center mt-5">Unauthorized Access 🚫</h3>;
  }

  // ✅ UI
  return (
    <div className="admin-panel">
      <h2>Admin Panel</h2>

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

      {activeTab === "tours" && (
        <>
          <button className="add-btn" onClick={() => openModal(false)}>
            ➕ Add New Tour
          </button>
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
                    <button
                      className="edit-btn"
                      onClick={() => openModal(true, t)}
                    >
                      Edit
                    </button>
                    <button
                      className="delete-btn"
                      onClick={() => handleDelete("tour", t._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}

      {activeTab === "bookings" && (
        <table className="admin-table">
          <thead>
            <tr>
              <th>Tour</th>
              <th>User Email</th>
              <th>Guests</th>
              <th>Total</th>
              <th>Date</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((b) => (
              <tr key={b._id}>
                <td>{b.tourName}</td>
                <td>{b.userEmail}</td>
                <td>{b.guestSize}</td>
                <td>${calculatePrice(b.tourName, b.guestSize)}</td>
                <td>{b.bookAt?.substring(0, 10)}</td>
                <td>
                  <button
                    className="delete-btn"
                    onClick={() => handleDelete("booking", b._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {activeTab === "users" && (
        <table className="admin-table">
          <thead>
            <tr>
              <th>Username</th>
              <th>Email</th>
              <th>Role</th>
              <th>Action</th>
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
                    <button
                      className="delete-btn"
                      onClick={() => handleDelete("user", u._id)}
                    >
                      Delete
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {showModal && (
        <div className="modal-overlay">
          {console.log("🧱 Rendering modal...")}
          <div className="modal">
            <h3>{isEditing ? "✏️ Edit Tour" : "➕ Add New Tour"}</h3>

            {tourData &&
              Object.keys(tourData).map((key) => {
                if (key === "_id" || key === "__v") return null;
                if (key === "featured") {
                  return (
                    <label key={key} className="checkbox-field">
                      <input
                        type="checkbox"
                        checked={tourData.featured}
                        onChange={(e) =>
                          setTourData({
                            ...tourData,
                            featured: e.target.checked,
                          })
                        }
                      />
                      Featured
                    </label>
                  );
                }

                return (
                  <input
                    key={key}
                    type={
                      ["price", "distance", "maxGroupSize"].includes(key)
                        ? "number"
                        : "text"
                    }
                    placeholder={key.charAt(0).toUpperCase() + key.slice(1)}
                    value={tourData[key] || ""}
                    onChange={(e) =>
                      setTourData({ ...tourData, [key]: e.target.value })
                    }
                  />
                );
              })}

            <div className="modal-actions">
              <button onClick={handleSave}>
                {isEditing ? "Update" : "Save"}
              </button>
              <button onClick={() => setShowModal(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPanel;

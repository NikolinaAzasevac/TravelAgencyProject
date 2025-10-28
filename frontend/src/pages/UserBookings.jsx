import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { BASE_URL } from "../utils/config";
import "../styles/userBookings.css";

const UserBookings = () => {
  const { user } = useContext(AuthContext);
  const [bookings, setBookings] = useState([]);
  const [tours, setTours] = useState([]);

  useEffect(() => {
    const fetchBookings = async () => {
      if (!user?.email || user?.role === "admin") return;
      const token = localStorage.getItem("token");

      const res = await fetch(`${BASE_URL}/booking/user/${user.email}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const result = await res.json();
      if (result.success) setBookings(result.data);
    };

    const fetchTours = async () => {
      const res = await fetch(`${BASE_URL}/tours`);
      const result = await res.json();
      if (result.success) setTours(result.data);
    };

    fetchBookings();
    fetchTours();
  }, [user]);

  const getTour = (tourName) => tours.find((t) => t.title === tourName);

  const formatPrice = (price) =>
    price?.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
    });

  return (
    <div className="user-bookings">
      <h2>My Bookings</h2>

      {bookings.length === 0 ? (
        <p>You have no bookings yet.</p>
      ) : (
        bookings.map((booking, index) => {
          const tour = getTour(booking.tourName);
          const pricePerPerson = tour?.price || 0;
          const total = pricePerPerson * booking.guestSize;

          return (
            <div key={index} className="booking-card">
              <h3 className="tour-name">{booking.tourName}</h3>

              <p>
                <strong>Full Name:</strong> {booking.fullName}
              </p>
              <p>
                <strong>Email:</strong> {booking.userEmail}
              </p>
              <p>
                <strong>Phone:</strong> {booking.phone}
              </p>
              <p>
                <strong>Guests:</strong> {booking.guestSize}
              </p>
              <p>
                <strong>Date:</strong> {booking.bookAt?.substring(0, 10)}
              </p>
              <p>
                <strong>Price per Person:</strong> {formatPrice(pricePerPerson)}
              </p>
              <p>
                <strong>Total Amount:</strong>{" "}
                {total ? formatPrice(total) : "N/A"}
              </p>
              <p className="booking-id">
                <strong>Booking ID:</strong> {booking._id}
              </p>
            </div>
          );
        })
      )}
    </div>
  );
};

export default UserBookings;

import { useState, useEffect } from "react";
import "../App.css";

function MyBookings({ userId }) {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch specifically by authenticated user's ID
    fetch(`/api/bookings/my-bookings/${userId}`)
      .then((res) => res.json())
      .then((data) => {
        setBookings(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching my bookings:", err);
        setLoading(false);
      });
  }, [userId]);

  if (loading) {
    return (
      <div className="search-empty-state">
        <p>Loading your schedule...</p>
      </div>
    );
  }

  return (
    <div style={{ padding: "20px", width: "100%", boxSizing: "border-box" }}>
      <div className="search-top-bar" style={{ marginBottom: "20px" }}>
        <h1>My Bookings</h1>
        <p style={{ color: "#6b7280" }}>Manage your upcoming and past room reservations.</p>
      </div>

      <div className="search-rooms-grid">
        {bookings.length > 0 ? (
          bookings.map((booking) => (
            <div className="search-room-card" key={booking.booking_id}>
              <div className="search-room-top">
                <span className="search-status-badge" style={{ backgroundColor: "#e0e7ff", color: "#4338ca" }}>
                  {booking.status}
                </span>
              </div>

              {/* Explicitly showing reserved room */}
              <h3>{booking.room_name}</h3>
              
              {/* Explicitly showing Building */}
              <p className="search-room-location">📍 Building: AUC New Cairo Campus</p>
              
              <div className="search-room-features" style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '15px', marginBottom: '15px' }}>
                {/* Explicitly showing Date and Time */}
                <span>📅 <strong>Date:</strong> {booking.date}</span>
                <span>⏰ <strong>Time:</strong> {booking.start_time}</span>
                <span>💻 <strong>Tech:</strong> {booking.technology}</span>
              </div>

              <button type="button" className="search-reset-btn" style={{ width: "100%", padding: "10px", color: "#dc2626", borderColor: "#dc2626" }}>
                Cancel Reservation
              </button>
            </div>
          ))
        ) : (
          // "No bookings yet" state per Acceptance Criteria
          <div className="search-empty-state" style={{ gridColumn: "1 / -1", marginTop: "40px" }}>
            <h3>No bookings yet.</h3>
            <p>You don't have any active or past reservations. Head over to the Search tab to book a room!</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default MyBookings;
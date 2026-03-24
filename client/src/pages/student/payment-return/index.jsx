
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { AuthContext } from "@/context/auth-context";
import { captureAndFinalizePaymentService } from "@/services";
import { useContext, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function RazorpayPaymentReturnPage() {
  const navigate = useNavigate();
  const { refreshAuthUser } = useContext(AuthContext);
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const paymentId = params.get("paymentId");
  const payerId = params.get("PayerID");
  const signature = params.get("signature");

  useEffect(() => {
    if (paymentId && payerId) {
      async function capturePayment() {
        const orderId = JSON.parse(sessionStorage.getItem("currentOrderId"));

        const response = await captureAndFinalizePaymentService(
          paymentId,
          payerId,
          orderId,
          signature
        );

        if (response?.success) {
          sessionStorage.removeItem("currentOrderId");
          refreshAuthUser();
          navigate("/student-courses");
        }
      }

      capturePayment();
    }
  }, [payerId, paymentId]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Processing payment... Please wait</CardTitle>
      </CardHeader>
    </Card>
  );
}

export default RazorpayPaymentReturnPage;
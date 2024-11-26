import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { checkoutSchema } from "./validationSchemas"; 
import { Card, CardContent, CardFooter, CardDescription } from "@/components/ui/card"; 
// import { Input, Label, Button, Spinner } from "./UIComponents"; 
// import { PaymentElement } from "@stripe/react-stripe-js"; 
import Image from "next/image";

const CheckoutPage = ({ total, subTotal, totaltax }) => {
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("");
  const [isPending, setIsPending] = useState(false);
  const [stripeError, setStripeError] = useState(null);

  const form = useForm({
    resolver: zodResolver(checkoutSchema),
    mode: "onChange",
    defaultValues: {
      name: "",
      phone: "",
      email: "",
      streetaddress: "",
      state: "",
      city: "",
      paymentMethod: undefined,
    },
  });

  const onSubmit = (data) => {
    // handle submission logic
  };

  return (
    <Card>
      <CardContent>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <fieldset disabled={isPending} className="group">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name</Label>
                <Input id="firstName" placeholder="John" {...form.register("name")} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name</Label>
                <Input id="lastName" placeholder="Doe" {...form.register("lastName")} />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="address">Address</Label>
              <Input id="address" placeholder="123 Main St" {...form.register("streetaddress")} />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="country">Country</Label>
                <select
                  id="country"
                  className="form-select"
                  {...form.register("country")}
                  onChange={(e) => setSelectedCountry(e.target.value)}
                >
                  <option value="">Select a country</option>
                  {/* Populate countries dynamically */}
                  <option value="USA">USA</option>
                  <option value="Canada">Canada</option>
                  {/* Add more countries */}
                </select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="city">City</Label>
                <select
                  id="city"
                  className="form-select"
                  {...form.register("city")}
                  disabled={!selectedCountry}
                >
                  <option value="">Select a city</option>
                  {/* Populate cities based on selected country */}
                  {selectedCountry === "USA" && (
                    <>
                      <option value="New York">New York</option>
                      <option value="Los Angeles">Los Angeles</option>
                    </>
                  )}
                  {selectedCountry === "Canada" && (
                    <>
                      <option value="Toronto">Toronto</option>
                      <option value="Vancouver">Vancouver</option>
                    </>
                  )}
                </select>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="state">State</Label>
              <Input id="state" placeholder="Select a state" {...form.register("state")} />
            </div>

            {/* Payment Methods */}
            <div className="form-check">
              <Label htmlFor="cash">
                <FormInput
                  control={form.control}
                  name="paymentMethod"
                  label="Cash On Delivery"
                  value="cash"
                  type="radio"
                  onChange={() => setSelectedPaymentMethod("cash")}
                  isPending={isPending}
                />
                <Image src="/cash.png" alt="Cash" width={80} height={80} />
              </Label>
            </div>

            <div className="form-check">
              <Label htmlFor="online">
                <FormInput
                  control={form.control}
                  name="paymentMethod"
                  label="Online Payment"
                  value="online"
                  type="radio"
                  onChange={() => setSelectedPaymentMethod("online")}
                  isPending={isPending}
                />
                <Image src="/Khalti_Logo_Color.png" alt="Khalti" width={120} height={120} />
              </Label>
            </div>

            {selectedPaymentMethod === "online" && (
              <Card>
                {stripeError && (
                  <CardDescription className="text-destructive">{stripeError}</CardDescription>
                )}
                <CardContent>
                  <PaymentElement />
                </CardContent>
              </Card>
            )}

            <div className="mt-8 space-x-6 text-center mb-5">
              <Button
                type="submit"
                className="inline-flex items-center justify-center rounded bg-indigo-500 px-12 py-4 text-sm font-medium text-white hover:bg-indigo-600 group-disabled:pointer-events-none"
              >
                <Spinner className="absolute h-4 group-enabled:opacity-0" />
                <span className="group-disabled:opacity-0">Checkout - ${subTotal + totaltax}</span>
              </Button>
            </div>
          </fieldset>
        </form>
      </CardContent>
      <CardFooter>
        <Button className="w-full">Pay ${total.toFixed(2)}</Button>
      </CardFooter>
    </Card>
  );
};

export default CheckoutPage;

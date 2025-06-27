"use client";

import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { verifyInformation } from "@/components/purchase/VerifyInformation";
import { AlertCircleIcon, CheckCircle2Icon } from "lucide-react";
import { getStates } from "@/lib/countrystatecity/states";
import { getCountries } from "@/lib/countrystatecity/countries";

import { SelectDropdown } from "@/components/purchase/selectDropdown";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export default function PurchaseForm({
  productId,
  productSize,
  totalPrice,
}: {
  productId: number;
  productSize: string;
  totalPrice: number;
}) {
  const [loading, setLoading] = useState(false);

  const [paymentMethod, setPaymentMethod] = useState<string>("upi");

  const [phoneNo, setPhoneNo] = useState<string>("");

  const [flatAndBuilding, setFlatAndBuilding] = useState<string>("");
  const [street, setStreet] = useState<string>("");
  const [pincode, setPincode] = useState<string>("");
  const [city, setCity] = useState<string>("");

  const [state, setState] = useState<string>("");
  const [openState, setOpenState] = useState<boolean | undefined>(false);

  const [country, setCountry] = useState<string>("India");
  const [openCountry, setOpenCountry] = useState<boolean | undefined>(false);

  const [states, setStates] = useState<string[]>([]);
  const [countries, setCountries] = useState<
    { name: string; id: number; iso2: string }[]
  >([]);

  useEffect(() => {
    getCountries().then((result) => {
      setCountries(result);
    });
  }, []);

  useEffect(() => {
    if (country) {
      const selectedCountry = countries.find((c) => c.name === country);
      if (selectedCountry) {
        getStates(selectedCountry.iso2).then((result) => {
          setStates(result);
        });
      }
    }
  }, [country, countries]);

  const [response, setResponse] = useState<{
    status: number;
    message: string;
  } | null>();

  return (
    <form
      className="flex flex-col items-center"
      action={async () => {
        setLoading(true);
        setResponse(
          await verifyInformation(productId, productSize, phoneNo, {
            flatAndBuilding,
            street,
            pincode,
            city,
            state,
            country,
          })
        );
        setLoading(false);
      }}
    >
      <div className="w-full lg:w-4/5">
        <p className="font-bold text-xl mb-2">Contact</p>
        <Label htmlFor="phoneno">Phone Number</Label>
        <Input
          className="w-full mb-2"
          id="phoneno"
          placeholder="9898989889"
          disabled={loading}
          required
          value={phoneNo}
          onChange={(e) => {
            const value = e.target.value;
            if (value === "" || /^\d+$/.test(value)) {
              setPhoneNo(value);
            }
          }}
        />
        <p className="font-bold text-xl my-2">Delivery</p>
        <SelectDropdown
          label="Country"
          value={country}
          onValueChange={setCountry}
          open={openCountry}
          onOpenChange={setOpenCountry}
          items={countries}
          itemKey="id"
          itemLabel="name"
          placeholder="Select your Country..."
          disabled={true}
          id="countries_button"
        />

        <SelectDropdown
          label="State"
          value={state}
          onValueChange={setState}
          open={openState}
          onOpenChange={setOpenState}
          items={states.map((s) => ({ id: s, name: s }))}
          itemKey="id"
          itemLabel="name"
          placeholder="Select your State..."
          disabled={loading || !country}
          id="states_button"
        />
        <Label htmlFor="flatAndBuilding">Flat and Building</Label>
        <Input
          className="w-full mb-2"
          id="flatAndBuilding"
          placeholder="A/104, smth building..."
          disabled={loading}
          required
          value={flatAndBuilding}
          onChange={(e) => {
            setFlatAndBuilding(e.target.value);
          }}
        />
        <Label htmlFor="street">Street</Label>
        <Input
          className="w-full mb-2"
          id="street"
          placeholder="Gandhi nagar, ram nagar, ..."
          disabled={loading}
          required
          value={street}
          onChange={(e) => {
            setStreet(e.target.value);
          }}
        />
        <Label htmlFor="city">City</Label>
        <Input
          className="w-full mb-2"
          id="city"
          placeholder="Borivali, Andheri, Vasai, ..."
          disabled={loading}
          required
          value={city}
          onChange={(e) => {
            setCity(e.target.value);
          }}
        />
        <Label htmlFor="pincode">Pincode</Label>
        <Input
          className="w-full mb-2"
          id="pincode"
          placeholder="400200"
          disabled={loading}
          required
          value={pincode}
          onChange={(e) => {
            const value = e.target.value;
            if (value === "" || /^\d+$/.test(value)) {
              setPincode(value);
            }
          }}
        />

        {/* <Label htmlFor="state">State</Label>
        <Input
          className="w-full mb-2"
          id="state"
          placeholder="Maharashtra, Punjab, ..."
          disabled={loading}
          required
          value={state}
          onChange={(e) => {
            setState(e.target.value);
          }}
        /> */}
        <p className="font-bold text-xl my-2">Payment</p>
        <RadioGroup
          value={paymentMethod}
          onValueChange={(value) => {
            setPaymentMethod(value);
          }}
        >
          <div className="flex items-center space-x-2 w-full bg-gray-300 mb-4 rounded-md p-4 border-2 border-gray-500">
            <RadioGroupItem value="upi" id="upi" />
            <Label htmlFor="upi">UPI, Cashfree Option</Label>
          </div>
          {/* <div className="flex items-center space-x-2 w-full bg-gray-300 mb-4 rounded-md p-4 border-2 border-gray-500">
            <RadioGroupItem value="cod" id="cod" />
            <Label htmlFor="cod">COD, Cash on Delivery</Label>
          </div> */}
        </RadioGroup>
        <p className="font-bold text-xl mb-2 block lg:hidden">Order summary</p>
        <div className="w-full p-2 pt-0 space-y-2 text-sm block lg:hidden mb-4">
          <div className="flex content-between justify-between">
            <p>Subtotal</p>
            <p>₹{totalPrice}</p>
          </div>
          <div className="flex content-between justify-between">
            <p>Shipping</p>
            <p className="text-gray-500">Free Shipping!</p>
          </div>
          <div className="flex content-between justify-between text-xl font-bold">
            <p>Total</p>
            <p>₹{totalPrice}</p>
          </div>
        </div>
        {response && (
          <Alert
            variant={response.status === 200 ? "default" : "destructive"}
            className="mb-4"
          >
            {response.status === 200 ? (
              <>
                <CheckCircle2Icon className="h-4 w-4" />
                <AlertTitle>Success!</AlertTitle>
                <AlertDescription>{response.message}</AlertDescription>
              </>
            ) : (
              <>
                <AlertCircleIcon className="h-4 w-4" />
                <AlertTitle>Unable to process your Information.</AlertTitle>
                <AlertDescription>
                  <p>
                    {response.message ||
                      "Please verify your information and try again."}
                  </p>
                </AlertDescription>
              </>
            )}
          </Alert>
        )}
        <Button className="w-full text-white" type="submit" disabled={loading}>
          Pay Now
        </Button>
      </div>
    </form>
  );
}

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
import { checkPromoCode } from "@/components/purchase/check-promo-code";

import { useRouter, useSearchParams } from "next/navigation";
import { Address, PaymentMethod } from "@/lib/prisma";

export default function PurchaseForm({
  productId,
  productSize,
  totalPrice,
  promoCode,
  addresses,
}: {
  promoCode: string | undefined;
  productId: number;
  productSize: string;
  totalPrice: number;
  addresses: Address[];
}) {
  const router = useRouter();
  const searchParams = useSearchParams();

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

  const [code, setCode] = useState<string>(promoCode || "");
  const [codeApplied, setCodeApplied] = useState<
    undefined | { code: string; discount: number }
  >();

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
    orderId?: string;
  } | null>();

  const [promoCodeResponse, setPromoCodeResponse] = useState<{
    status: "success" | "error";
    message: string;
  } | null>(null);

  const [selectedAddressId, setSelectedAddressId] = useState<number | null>(
    null
  );
  const [useSavedAddress, setUseSavedAddress] = useState(false);

  return (
    <form className="flex flex-col items-center">
      <div className="w-full lg:w-4/5">
        {addresses.length > 0 && (
          <div className="mb-4">
            <p className="font-bold text-xl mb-2">Saved Addresses</p>
            <div className="flex flex-col gap-2 mt-2">
              {addresses.map((address) => (
                <div
                  key={address.id}
                  className={`p-3 text-sm border rounded-md cursor-pointer ${
                    selectedAddressId === address.id
                      ? "border-blue-500 bg-blue-50"
                      : "border-gray-200"
                  }`}
                  onClick={() => {
                    setSelectedAddressId(address.id);
                    setUseSavedAddress(true);
                    setFlatAndBuilding(address.flatAndBuilding);
                    setStreet(address.street);
                    setPincode(address.pincode);
                    setCity(address.city);
                    setState(address.state);
                    setCountry(address.country);
                  }}
                >
                  <p className="font-medium">{address.flatAndBuilding}</p>
                  <p>
                    {address.street}, {address.city}
                  </p>
                  <p>
                    {address.state}, {address.country} - {address.pincode}
                  </p>
                </div>
              ))}
            </div>

            <div className="flex items-center mt-2">
              <input
                type="checkbox"
                id="useSavedAddress"
                checked={useSavedAddress}
                onChange={(e) => {
                  setUseSavedAddress(e.target.checked);
                  if (!e.target.checked) {
                    setSelectedAddressId(null);
                    setUseSavedAddress(false);
                    setFlatAndBuilding("");
                    setStreet("");
                    setPincode("");
                    setCity("");
                    setState("");
                    setCountry("India");
                  }
                }}
                className="mr-2"
              />
              <Label htmlFor="useSavedAddress">Use selected address</Label>
            </div>
          </div>
        )}
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
          disabled={loading || useSavedAddress}
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
          disabled={loading || useSavedAddress}
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
          disabled={loading || useSavedAddress}
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
          disabled={loading || useSavedAddress}
          required
          value={pincode}
          onChange={(e) => {
            const value = e.target.value;
            if (value === "" || /^\d+$/.test(value)) {
              setPincode(value);
            }
          }}
        />
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
        <p className="font-bold text-xl mb-2 block lg:hidden">Promo Code</p>
        <div className="flex mb-4 space-x-2 bg-gray-200 border-2 border-gray-500 p-2 rounded-md lg:hidden">
          <Input
            className="w-1/2 border-gray-500"
            placeholder="SWAY18"
            disabled={loading || codeApplied != undefined}
            value={code}
            onChange={(e) => {
              const upperValue = e.target.value.toUpperCase();
              setCode(upperValue);
            }}
          />
          <Button
            className="w-1/2"
            onClick={async (e) => {
              e.preventDefault();
              if (!code) {
                setPromoCodeResponse({
                  status: "error",
                  message: "Please enter a promo code",
                });
                return;
              }

              setLoading(true);
              setPromoCodeResponse(null);

              const response = await checkPromoCode(code);

              setLoading(false);

              if (response.error) {
                setPromoCodeResponse({
                  status: "error",
                  message: response.error,
                });
                setCodeApplied(undefined);
              } else if (response.success) {
                setPromoCodeResponse({
                  status: "success",
                  message: `Promo code applied! ${response.discount}% discount`,
                });
                setCodeApplied({
                  code: code,
                  discount: response.discount,
                });
                const params = new URLSearchParams(window.location.search);
                params.set("promoCode", code);
                router.replace(`?${params.toString()}`, { scroll: false });
              }
            }}
            disabled={loading || codeApplied != undefined}
          >
            {loading ? "Applying..." : "Apply Code"}
          </Button>
        </div>
        {promoCodeResponse && (
          <Alert
            variant={
              promoCodeResponse.status === "success" ? "default" : "destructive"
            }
            className="mb-4"
          >
            {promoCodeResponse.status === "success" ? (
              <>
                <CheckCircle2Icon className="h-4 w-4" />
                <AlertTitle>Success!</AlertTitle>
              </>
            ) : (
              <>
                <AlertCircleIcon className="h-4 w-4" />
                <AlertTitle>Error</AlertTitle>
              </>
            )}
            <AlertDescription>{promoCodeResponse.message}</AlertDescription>
          </Alert>
        )}
        <p className="font-bold text-xl mb-2 block lg:hidden">Order summary</p>
        <div className="w-full p-2 pt-0 space-y-2 text-sm block lg:hidden mb-2">
          <div className="flex content-between justify-between">
            <p>Subtotal</p>
            {codeApplied == undefined ? (
              <p>₹{totalPrice}</p>
            ) : (
              <div className="flex">
                <p className="line-through mr-2">₹{totalPrice}</p>
                <p className="font-semibold">
                  ₹
                  {Math.floor(
                    totalPrice - totalPrice * (codeApplied.discount / 100)
                  )}
                </p>
              </div>
            )}
          </div>
          <div className="flex content-between justify-between">
            <p>Shipping</p>
            <p className="text-gray-500">Free Shipping!</p>
          </div>
          <div className="flex content-between justify-between text-xl font-bold">
            <p>Total</p>
            {codeApplied == undefined ? (
              <p>₹{totalPrice}</p>
            ) : (
              <p className="font-semibold">
                ₹
                {Math.floor(
                  totalPrice - totalPrice * (codeApplied.discount / 100)
                )}
              </p>
            )}
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
        <Button
          className="w-full lg:mb-2"
          onClick={async () => {
            setLoading(true);

            const promoCode = searchParams.get("promoCode");
            const verificationResponse = await verifyInformation(
              productId,
              productSize?.trim() as string,
              paymentMethod as PaymentMethod,
              promoCode?.trim() as string,
              phoneNo?.trim() as string,
              selectedAddressId && useSavedAddress
                ? { id: selectedAddressId }
                : {
                    flatAndBuilding: flatAndBuilding.trim(),
                    street: street.trim(),
                    pincode: pincode.trim(),
                    city: city.trim(),
                    state: state.trim(),
                    country: country.trim(),
                  }
            );

            setResponse(verificationResponse);

            if (
              verificationResponse?.status === 200 &&
              verificationResponse.orderId
            ) {
              await new Promise((resolve) => setTimeout(resolve, 5000));
              router.push(`/checkout?id=${verificationResponse.orderId}`);
              return;
            }

            setLoading(false);
          }}
          disabled={loading}
        >
          {loading ? "Processing..." : "Pay Now"}
        </Button>
      </div>
    </form>
  );
}

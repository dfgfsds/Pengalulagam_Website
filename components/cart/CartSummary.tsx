"use client";

import { getDeliveryChargeApi, getPaymentDeliveryPartnerApi, getVendorDeliveryDetailsApi, patchUserSelectAddressAPi } from '@/api-endpoints/authendication';
import { deleteCouponApi, getAddressApi, getAllCouponsApi, getAppliedCouponDataApi, getCartApi, postApplyCouponApi, postCODPaymentApi, postDtdcChargeApi, postPaymentApi } from '@/api-endpoints/CartsApi';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { useUser } from '@/context/UserContext';
import { useVendor } from '@/context/VendorContext';
import { formatPrice } from '@/lib/utils';
import { InvalidateQueryFilters, useQuery, useQueryClient } from '@tanstack/react-query';
import { Loader2, MapPin } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import OrderSuccessModal from './OrderSucessModal';
import { useCurrency } from '@/context/CurrencyContext';
import axios from 'axios';
import { baseUrl } from '@/api-endpoints/ApiUrls';


export default function CartSummary({ totalAmount }: any) {
  const subtotal = 84.97;
  const shipping = 4.99;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;
  const [userId, setUserId] = useState<string | null>(null);
  const [getCartId, setCartId] = useState<string | null>(null);
  const [cartItems, setCartItem] = useState()
  const [DeliveryChargeValue, setDeliveryChargeValue] = useState<any>()
  const { user }: any = useUser();
  const { vendorId } = useVendor();
  const [code, setCode] = useState('');
  const [isChecking, setIsChecking] = useState(false);
  const [error, setError] = useState('');
  const [getUserName, setUserName] = useState<string | null>(null);
  const router = useRouter();
  const [selectedAddressId, setSelectedAddressId] = useState<string>();
  const queryClient = useQueryClient();
  const [errorMessage, setErrorMessage] = useState<any>()
  const [loading, setLoading] = useState(false);
  const [dtdcSelectValue, setDtdcSelectValue] = useState('');
  const [dtdcErrorMessage, setDtdcErrorMessage] = useState('');
  const [dtdcLoader, setDtdcLoader] = useState(false);
  const [paymentValue, setPaymentValue] = useState('')
  const [dtdcDeliveryCharge, setDtdcDeliveryCharge] = useState<any>();
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [addressError, setAddressError] = useState<any>('');
  const [couponLoader, setCouponloader] = useState(false);
  const [referrelCode, setReferrelCode] = useState('');
  const [referrelCodeError, setReferrelCodeError] = useState('');
  const [appliedReferralCode, setAppliedReferralCode] = useState(false);
  const { convertPrice } = useCurrency();
  const paymentMethod = [
    { value: "", label: "Pay Online" },
    { value: "cod", label: "Cash on Delivery" }
  ]
  const dtdcMethod: any = [
    { value: "B2C PRIORITY" },
    { value: "B2C SMART EXPRESS" }
  ]
  const handleDtdcMethod = (value: string) => {
    setDtdcSelectValue(value)
  };

  const handlePaymentMethod = (value: string) => {
    setPaymentValue(value)
  }



  const getVendorDeliveryDetailsData: any = useQuery({
    queryKey: ['getVendorDeliveryDetailsData', vendorId],
    queryFn: () => getVendorDeliveryDetailsApi(`${vendorId}`),
    enabled: !!vendorId
  })

  const { data, isLoading }: any = useQuery({
    queryKey: ['getAddressData', userId],
    queryFn: () => getAddressApi(`user/${userId}`),
    enabled: !!userId
  })

  // getAppliedCouponDataApi
  const getAppliedCouponData: any = useQuery({
    queryKey: ['getAppliedCouponDataData', userId],
    queryFn: () => getAppliedCouponDataApi(`?user_id=${userId}`),
    enabled: !!userId
  })

  // getPaymentDeliveryPartnerApi
  const getPaymentDeliveryPartnerData: any = useQuery({
    queryKey: ['getAppliedCouponDataData', vendorId],
    queryFn: () => getPaymentDeliveryPartnerApi(`${vendorId}`),
    enabled: !!vendorId
  })


  const handleSelectAddress = async (id: any) => {
    try {
      const upadetApi = await patchUserSelectAddressAPi(`user/${userId}/address/${id?.id}`, { updated_by: getUserName })
      if (upadetApi) {
        queryClient.invalidateQueries(['getAddressData'] as InvalidateQueryFilters);

      }
    } catch (error) {

    }
  }


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsChecking(true);

    const payload = {
      user_id: Number(userId),
      coupon_code: code,
      vendor_id: vendorId,
      updated_by: getUserName || 'user'
    };

    try {
      const updateApi = await postApplyCouponApi("", payload);
      if (updateApi) {
        queryClient.invalidateQueries(['getAllCouponsData'] as InvalidateQueryFilters);
      }
    } catch (error: any) {
      // console.log(error)
      setError("Failed to apply coupon. Please try again.");
      // setError("Failed to apply coupon. Please try again.");
    } finally {
      setIsChecking(false);
    }
  };

  const handleReferrelSubmit = async () => {
    const payload = {
      updated_by: "user",
      referral_code: referrelCode,
      cart_id: user?.data?.cartId || localStorage.getItem('cartId'),
    }

    try {
      const res = await axios.post(`${baseUrl}/add-referral-code/`, payload)
      setAppliedReferralCode(true)
      setReferrelCodeError("")
    } catch (error: any) {
      setReferrelCodeError(error?.response?.data?.message || "Failed to apply refferal code. Please try again.")

    }
  }

  const handleRemoveReferrelSubmit = async () => {

    try {
      const res = await axios.delete(`${baseUrl}/remove-referral-code/${user?.data?.cartId || localStorage.getItem('cartId')}`)
      setAppliedReferralCode(false)
      setReferrelCode("")
      setReferrelCodeError("")
    } catch (error: any) {
      setReferrelCodeError(error?.response?.data?.message || "Failed to apply refferal code. Please try again.")

    }
  }


  useEffect(() => {
    try {
      const storedUserId = localStorage.getItem('userId');
      const storedCartId = localStorage.getItem('cartId');
      const storedUserName = localStorage.getItem('userName');

      setUserName(storedUserName);
      setUserId(storedUserId);
      setCartId(storedCartId);
      setUserId(storedUserId);

    } catch (e) {
      console.error("Failed to access localStorage", e);
    }
  }, []);

  const handleCheckout = async () => {
    setLoading(true);
    setErrorMessage('')
    try {
      if (paymentValue !== 'cod') {
        const paymentAPi = await postPaymentApi('', {
          customer_phone: user?.data?.contact_number,
          vendor_id: vendorId,
          user_id: user?.data?.id,
          dtdc_courier_service_type: dtdcSelectValue
        });

        if (paymentAPi) {
          const { payment_order_id, final_price } = paymentAPi.data;

          const options = {
            key: "rzp_live_RQwb3oSmpvO8Or",
            amount: final_price * 100,
            currency: "INR",
            name: "Pengal Ulagam",
            description: "Order Payment",
            order_id: payment_order_id,
            handler: function (response: any) {
              setPaymentSuccess(true);
            },
            prefill: {
              name: user?.data?.name,
              email: user?.data?.email,
              contact: user?.data?.contact_number,
            },
            notes: {
              address: "Selected Address",
            },
            theme: {
              color: "#a8822d80",
            },
          };
          // toast.success("created successfully!");
          const razor = new (window as any).Razorpay(options);
          razor.open();
        }
      } else {
        const updateApi = await postCODPaymentApi("",
          {
            customer_phone: user?.data?.contact_number,
            vendor_id: vendorId,
            user_id: user?.data?.id,
            dtdc_courier_service_type: dtdcSelectValue

          }
        );
        if (updateApi) {

          setPaymentSuccess(true);
          // getCartitemsData

        }
      }


    } catch (error: any) {
      setErrorMessage(error?.response?.data?.error || "Failed to initiate payment. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // useEffect(() => {
  //   const fetchCartAndDeliveryCharge = async () => {
  //     try {
  //       // 1. Fetch cart data
  //       const cartResponse: any = await getCartApi(getCartId);
  //       if (cartResponse) {
  //         setCartItem(cartResponse);
  //       }

  //       // 2. Fetch delivery charge
  //       if (user?.data?.contact_number && userId && vendorId) {
  //         const deliveryResponse: any = await getDeliveryChargeApi('', {
  //           user_id: userId,
  //           vendor_id: vendorId,
  //           payment_mode: 'cod',
  //           customer_phone: user?.data?.contact_number,
  //         });
  //         if (deliveryResponse) {
  //           setDeliveryChargeValue(deliveryResponse);
  //         }
  //       }
  //     } catch (error) {
  //       console.error("Error in cart/delivery API:", error);
  //     }
  //   };

  //   if (getCartId) {
  //     fetchCartAndDeliveryCharge();
  //   }
  // }, [getCartId, userId, vendorId, user?.data?.contact_number]);

  useEffect(() => {
    if (data?.data?.length) {
      const selected = data?.data?.find((address: any) => address?.selected_address === true);
      if (selected?.id) {
        setSelectedAddressId(String(selected?.id));
      }
    }
  }, [data]);

  const postDtdcCharge = async () => {
    setDtdcLoader(true);
    setDtdcErrorMessage('')
    try {
      // 1. Fetch cart data
      const dtdcDeliveryCharge: any = await postDtdcChargeApi('',
        {
          user_id: user?.data?.id,
          vendor_id: vendorId,
          payment_mode: paymentValue === 'PAY ON' ? '' : 'cod',
          customer_phone: user?.data?.contact_number,
          service_type: dtdcSelectValue
        });
      if (dtdcDeliveryCharge) {
        setDtdcDeliveryCharge(dtdcDeliveryCharge?.data)
      }
    } catch (error: any) {
      setDtdcLoader(false)
      setDtdcErrorMessage(error?.response?.data?.error)
      console.log(error)
    }
  };
  useEffect(() => {


    if (dtdcSelectValue) {
      postDtdcCharge();
    }
  }, [dtdcSelectValue, paymentValue]);

  const fetchCartAndDeliveryCharge = async () => {
    try {
      // 1. Fetch cart data
      const cartResponse: any = await getCartApi(getCartId);
      if (cartResponse) {
        setCartItem(cartResponse);
      }

      // 2. Fetch delivery charge
      if (user?.data?.contact_number && userId && vendorId) {
        const deliveryResponse: any = await getDeliveryChargeApi('', {
          user_id: userId,
          vendor_id: vendorId,
          payment_mode: paymentValue,
          customer_phone: user?.data?.contact_number,
        });
        if (deliveryResponse) {
          setDeliveryChargeValue(deliveryResponse?.data);
          setAddressError(null)
        }
      }
    } catch (error: any) {
      setAddressError(error?.response?.data?.error || "Something went wrong ,Please try again later");
    }
  };

  useEffect(() => {

    if (getCartId) {
      fetchCartAndDeliveryCharge();
    }
  }, [getCartId, userId, vendorId, user?.data?.contact_number, paymentValue, totalAmount]);

  // getAllCouponsData
  const getAllCouponsData: any = useQuery({
    queryKey: ['getAllCouponsData', vendorId],
    queryFn: () => getAllCouponsApi(`?vendor_id=${vendorId}`),
    // enabled: !!vendorId
  })
  const availableCoupons = getAllCouponsData?.data?.data?.data

  const handleRemoveCoupon = async () => {
    setCouponloader(true);
    try {
      const updateAPi = await deleteCouponApi(`${getCartId}/coupon/${getAppliedCouponData?.data?.data?.applied_coupons[0]?.coupon_id}/remove/`, { updated_by: getUserName ? getUserName : 'user' })
      if (updateAPi) {
        setCouponloader(false);
        queryClient.invalidateQueries(['getAppliedCouponDataData'] as InvalidateQueryFilters);
        setError('');
        setCode('');
      }
    } catch (error) {

    }
  }

  return (
    <>
      {data?.data?.length ? (
        <div className="space-y-3 mb-3">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-medium text-gray-900">Delivery Address</h3>
            <Link
              href="/profile?tab=addresses"
              className="text-sm text-blue-600 hover:text-blue-700"
            // onClick={() => {onClose(),setOpenMoadl(!openModal)}}
            >
              Manage addresses
            </Link>
          </div>

          <div className="space-y-2">

            {data?.data?.map((address: any) => (
              <label
                key={address.id}
                className={`flex items-start p-3 rounded-lg border cursor-pointer
            ${selectedAddressId === address.id ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:bg-gray-50'}`}
              >
                <input
                  type="radio"
                  name="deliveryAddress"
                  value={address.id}
                  checked={selectedAddressId === String(address.id)}
                  onChange={() => { handleSelectAddress(address) }}
                  className="mt-1 h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                />
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-900">
                    {address.street}
                    {address.isDefault && (
                      <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800">
                        Default
                      </span>
                    )}
                  </p>
                  <p className="text-sm font-bold text-gray-500">
                    {address.customer_name}, {address.contact_number},
                  </p>
                  <p className="text-sm text-gray-500">
                    {address.address_line1}, {address.address_line2},
                  </p>
                  <p className="text-sm text-gray-500">
                    {address.city}, {address.state} {address.postal_code}
                  </p>
                  <p className="text-sm text-gray-500">{address.country}</p>
                </div>
              </label>
            ))}
          </div>

        </div>
      ) : (
        <div className="text-center p-4 bg-gray-50 rounded-lg mb-3">
          <MapPin className="mx-auto h-8 w-8 text-gray-400" />
          <p className="mt-2 text-sm text-gray-600">No delivery address found</p>
          <p className="mt-2 inline-block text-sm text-green-600 hover:text-green-700 cursor-pointer"
            onClick={() => {
              router.push('/profile?tab=addresses')
            }
              //  setOpenMoadl(!openModal)
            }
          >
            Add a delivery address
          </p>
        </div>
      )}


      <div className="bg-[#F8F7F2] rounded-xl p-6">
        {/* <div>
          <label>Delivery Method</label>
          {dtdcMethod?.map((item: any) => (
            <label
              className={`flex items-start mb-2 p-3 rounded-lg border cursor-pointer
          ${dtdcSelectValue === item?.value ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:bg-gray-50'}`}
            >
              <input
                type="radio"
                name="dtdcMethod"
                value={item?.value}
                checked={dtdcSelectValue === String(item?.value)}
                onChange={() => { handleDtdcMethod(item?.value) }}
                className="mt-1 h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"

              />
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-900">
                  {item?.value}
                </p>
              </div>
            </label>
          ))}
        </div>
        {dtdcErrorMessage && (
          <p className='py-2 text-sm text-red-700'>{dtdcErrorMessage}</p>
        )} */}
        <h2 className="text-xl font-semibold mb-6">Order Summary</h2>

        <div className="space-y-4">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Subtotal</span>
            <span>{formatPrice(totalAmount)}</span>
          </div>
          {getPaymentDeliveryPartnerData?.data?.data[0]?.delivery_partner === "own_delivery" ?
            (<>
              {/* <div className="space-y-4 font-bold !text-gray-600 mt-1">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Deliver Charge</span>
                {paymentValue === 'cod' ? (
                <span>{convertPrice(Number(getPaymentDeliveryPartnerData?.data?.data[0]?.own_delivery_charge))}</span>
                ):(
                <span>{convertPrice(Number(getPaymentDeliveryPartnerData?.data?.data[0]?.own_delivery_charge)) + Number(getPaymentDeliveryPartnerData?.data?.data[0]?.own_cod_delivery_charge)}</span>
                )}
              </div >
            </div > */}

              <div className="space-y-4 font-bold !text-gray-600 mt-1">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Deliver Charge</span>

                  {paymentValue === "cod" ? (
                    <span>
                      {convertPrice(
                        Number(getPaymentDeliveryPartnerData?.data?.data[0]?.own_delivery_charge) +
                        Number(getPaymentDeliveryPartnerData?.data?.data[0]?.own_cod_delivery_charge)
                      )}
                    </span>
                  ) : (
                    <span>
                      {convertPrice(
                        Number(getPaymentDeliveryPartnerData?.data?.data[0]?.own_delivery_charge)
                      )}
                    </span>
                  )}
                </div>
              </div>

              {/* <div className="space-y-4 font-bold !text-gray-600 mt-1">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Total</span>
                <span>{convertPrice(
                  Number(totalAmount) +
                  Number(getPaymentDeliveryPartnerData?.data?.data[0]?.own_delivery_charge || 0)+
                   Number(getPaymentDeliveryPartnerData?.data?.data[0]?.own_cod_delivery_charge)
                )}</span>
              </div>
            </div> */}

              <div className="space-y-4 font-bold !text-gray-600 mt-1">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Total</span>
                  <span>
                    {paymentValue === "cod"
                      ? convertPrice(
                        Number(totalAmount || 0) +
                        Number(getPaymentDeliveryPartnerData?.data?.data[0]?.own_delivery_charge || 0) +
                        Number(getPaymentDeliveryPartnerData?.data?.data[0]?.own_cod_delivery_charge || 0)
                      )
                      : convertPrice(
                        Number(totalAmount || 0) +
                        Number(getPaymentDeliveryPartnerData?.data?.data[0]?.own_delivery_charge || 0)
                      )}
                  </span>
                </div>
              </div>

            </>) : (
              <>
                {
                  addressError ?
                    <span className='mt-4 p-2 text-red-600'>{addressError}</span>
                    :
                    <>
                      <div className="space-y-4 font-bold !text-gray-600 mt-1">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Deliver Charge (incl transaction charges)</span>
                          <span>{convertPrice(Number(DeliveryChargeValue?.final_delivery_charge))}</span>
                        </div >
                      </div >

                      <div className="space-y-4 font-bold !text-gray-600 mt-1">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Total</span>
                          <span>{convertPrice(Number(DeliveryChargeValue?.final_price_including_delivery))}</span>
                        </div>
                      </div>
                    </>
                }
              </>
            )}

          {/* {dtdcDeliveryCharge?.final_delivery_charge && (
            <div className="flex justify-between">
              <span className="text-muted-foreground">Shipping<span className='text-sm ml-0.5'>(Include transaction fee)</span></span>
              <span>
                {formatPrice(dtdcDeliveryCharge?.final_delivery_charge)}
               
              </span>

            </div>
          )} */}

          {/* <div className="flex justify-between">
          <span className="text-muted-foreground">Tax</span>
          <span>{formatPrice(tax)}</span>
        </div> */}

          <Separator />
          {/* {dtdcDeliveryCharge?.final_price_including_delivery && (
            <div className="flex justify-between font-semibold">
              <span>Total</span>
              <span>{formatPrice(dtdcDeliveryCharge?.final_price_including_delivery)}</span>
            
            </div>
          )} */}
        </div>

        <div className="mt-6 space-y-4">
          {/* {getAppliedCouponData?.data?.data?.applied_coupons?.length ? (
            <div className="bg-green-50 p-4 rounded-lg space-y-2 flex justify-between">
              <div className=''>
                <p className="text-sm text-green-700 font-bold mb-2">
                  Applied Coupon: {getAppliedCouponData?.data?.data?.data[0]?.code}
                </p>

                <p className="text-sm text-green-700 font-bold">
                  Discount Amount: ₹{getAppliedCouponData?.data?.data?.applied_coupons[0]?.discount || 0}
                </p>
              </div>
              <Button
                onClick={handleRemoveCoupon}
                variant="outline"
                className="text-red-600 border-red-300 hover:bg-red-50"
              >
                Remove Coupon
              </Button>
            </div>
          ) : (
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Input
                  type="text"
                  placeholder="Discount code"
                  className="bg-white"
                  value={code}
                  onChange={(e: any) => setCode(e.target.value.toUpperCase())}
                />
                <Button disabled={!code || isChecking} onClick={handleSubmit} variant="outline" className="whitespace-nowrap">
                  
                  {isChecking ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    'Apply'
                  )}
                </Button>
              </div>
              {error && (
                <p className="text-sm text-red-600">{error}</p>
              )}
            </div>
          )} */}

          {getAppliedCouponData?.data?.data?.applied_coupons?.length ? (
            <div className="bg-green-50 p-4 rounded-lg space-y-2 flex justify-between">
              <div>
                <p className="text-sm text-green-700 font-bold mb-2">
                  Applied Coupon: {getAppliedCouponData?.data?.data?.data[0]?.code}
                </p>
                <p className="text-sm text-green-700 font-bold">
                  Discount Amount: ₹{getAppliedCouponData?.data?.data?.applied_coupons[0]?.discount || 0}
                </p>
              </div>
              <Button
                onClick={() => {
                  handleRemoveCoupon();
                  setCode(""); // reset code on remove
                }}
                variant="outline"
                className="text-red-600 border-red-300 hover:bg-red-50"
                disabled={couponLoader}
              >
                {couponLoader ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  "Remove Coupon"
                )}
                {/* Remove Coupon */}
              </Button>
            </div>
          ) : (
            <div>
              <h4 className="font-semibold mb-2">Apply Coupon:</h4>

              <div className="flex items-center gap-2 mb-2">
                <Input
                  type="text"
                  placeholder="Discount code"
                  className="bg-white"
                  value={code}
                  onChange={(e: any) => setCode(e?.target?.value)}
                />
                <Button
                  disabled={!code || isChecking}
                  onClick={handleSubmit}
                  variant="outline"
                  className="whitespace-nowrap"
                >
                  {isChecking ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    "Apply"
                  )}
                </Button>
              </div>
              {error && <p className="text-sm text-red-600">{error}</p>}
              {availableCoupons
                ?.filter((coupon: any) => {
                  if (!coupon?.allowed_users?.length) return true;
                  return coupon?.allowed_users?.includes(userId);
                })
                ?.map((coupon: any) => (
                  <div
                    key={coupon.id}
                    onClick={() => {
                      setCode(coupon?.code);
                      // handleSelectCoupon(coupon?.code); // ✅ auto apply on click
                    }}
                    className="cursor-pointer border mb-1 border-gray-200 bg-white rounded-lg p-3 hover:bg-gray-50 transition-all"
                  >
                    <div className="flex justify-between">
                      <span className="font-bold text-[#b39e49]">{coupon?.code}</span>
                      <span className="text-sm text-gray-600">
                        {coupon?.discount_type === "percentage"
                          ? `${coupon?.discount_value}% OFF`
                          : `₹${coupon?.flat_discount} OFF`}
                      </span>
                    </div>
                    <p className="text-sm text-gray-500">{coupon?.description}</p>
                  </div>
                ))}

            </div>
          )}

          <div>
            <h4 className="font-semibold mb-2">Apply Refferal:</h4>

            <div className="flex items-center gap-2 mb-2">
              <Input
                type="text"
                placeholder="Refferal code"
                className="bg-white"
                value={referrelCode}
                onChange={(e: any) => setReferrelCode(e?.target?.value)}
              />
              <Button
                disabled={!referrelCode}
                onClick={appliedReferralCode ? handleRemoveReferrelSubmit : handleReferrelSubmit}
                variant="outline"
                className="whitespace-nowrap"
              >
                {isChecking ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  appliedReferralCode ? 'Remove' : 'Apply'
                )}
              </Button>
            </div>
            {referrelCodeError && <p className="text-sm text-red-600">{referrelCodeError}</p>}
          </div>

          <div>
            <label>Payment Method</label>
            {paymentMethod?.map((item: any) => (
              <label
                className={`flex items-start mb-2 p-3 rounded-lg border cursor-pointer
          ${paymentValue === item?.value ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:bg-gray-50'}`}
              >
                <input
                  type="radio"
                  name="paymentMethod"
                  value={item?.value}
                  checked={paymentValue === String(item?.value)}
                  onChange={() => { handlePaymentMethod(item?.value) }}
                  className="mt-1 h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                />
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-900">
                    {item?.label}
                  </p>
                </div>
              </label>
            ))}
          </div>

          {!data?.data?.length ? (
            <Button className="w-full bg-[#a8822d] hover:bg-[#977526]"
              onClick={() => {
                router.push('/profile?tab=addresses')
              }}
            >
              Add a delivery address
            </Button>
          ) : (
            <>
              <Button className="w-full bg-[#a8822d] hover:bg-[#977526]"
                onClick={handleCheckout}
                // disabled={!selectedAddressId || loading || !dtdcSelectValue || !paymentValue}
                disabled={!selectedAddressId || loading || !getPaymentDeliveryPartnerData?.data?.data[0]?.delivery_partner}
              >

                {loading && <Loader2 className="h-5 w-5 animate-spin" />}
                {loading ? 'Processing...' : 'Proceed to Checkout'}
              </Button>
              {errorMessage && (
                <div className='text-red-600 mt-2'>
                  {errorMessage}
                </div>
              )}
            </>
          )}
          <div className="text-center text-sm text-muted-foreground">
            <p>We accept:</p>
            <div className="flex justify-center gap-2 mt-2">
              <img src="https://raw.githubusercontent.com/simple-icons/simple-icons/develop/icons/visa.svg" alt="Visa" className="h-6 w-auto opacity-70" />
              <img src="https://raw.githubusercontent.com/simple-icons/simple-icons/develop/icons/mastercard.svg" alt="Mastercard" className="h-6 w-auto opacity-70" />
              <img src="https://raw.githubusercontent.com/simple-icons/simple-icons/develop/icons/paypal.svg" alt="PayPal" className="h-6 w-auto opacity-70" />
              <img src="https://raw.githubusercontent.com/simple-icons/simple-icons/develop/icons/applepay.svg" alt="Apple Pay" className="h-6 w-auto opacity-70" />
            </div>
          </div>
        </div>


      </div>
      {paymentSuccess && <OrderSuccessModal />}

    </>
  );
}
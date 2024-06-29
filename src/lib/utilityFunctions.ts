import { IPharmacy, IProductVariation, IVariant } from "@/redux/slices/medicine/medicineSlice";
import dayjs, {Dayjs} from "dayjs"

export const isCurrentPage = (pathname: string, pageLinks: string[]): boolean => pageLinks.includes(pathname)

export const emojifyString = (emoji: string, string: string): string => emoji + "\xa0\xa0\xa0\xa0\xa0"+ string

export const numberSplitter = (number: number | undefined): string =>  number ? number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : '0';

export const formatPrice = (number: number | undefined) : string => `₦ ${numberSplitter(number)}`

export function getDateAndTime(date: string): string{
    return `${new Date(date).toLocaleDateString('en-us', {
      // weekday:"short", 
      year:"numeric", month:"short", day:"numeric"})} • ${new Date(date).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit', hour12: true})}`
}

export function getDate(date: string): string{
  return `${new Date(date).toLocaleDateString('en-us', { weekday:"short", year:"numeric", month:"short", day:"numeric"})}`
}

export function getShortDate(date: string): string{
  return `${new Date(date).toLocaleDateString('en-us', {year:"numeric", month:"short", day:"numeric"})}`
}

export function getTime(date: string): string{
  return `${new Date(date).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit', hour12: true})}`
}

export function generateTimeOptions(
  fromDate: Dayjs,
  toDate: Dayjs,
  stepMinutes: number
) {
  const timeOptions: { name: string; value: string }[] = [];
  let currentTime = fromDate;
  let today = dayjs()

  while (currentTime.isBefore(toDate) || currentTime.isSame(toDate)) {
    const hours = currentTime.hour();
    const minutes = currentTime.minute();
    
    const ampm = hours < 12 ? 'AM' : 'PM';
    const formattedHours = hours <= 12 ? hours : hours - 12;
    const formattedMinutes = String(minutes).padStart(2, '0');

    const timeLabel = `${formattedHours}:${formattedMinutes} ${ampm}`;
    const timeValue = currentTime;
    
    timeOptions.push({ name: timeLabel, value: new Date(timeValue.format('YYYY-MM-DD HH:mm:ss')).toISOString().slice(0, 19) });

    // Advance the current time by the specified step (in minutes)
    currentTime = currentTime.add(stepMinutes, 'minute');
  }


  return timeOptions;
}

interface ICombination {
  name: string;
  variantsId: string[];
  variantsComboId: string;
}

export function generateVariantCombinations(variants: IVariant[], currentCombo: string[] = [], index: number = 0, combinations: ICombination[] = []): ICombination[] {
  if (index === variants.length) {
      const variantIds = currentCombo.map((value, i) => variants[i].values.find(v => v.value === value)?.id ?? '');
      const comboId = variantIds.join(',');
      combinations.push({
          name: currentCombo.join(' / '),
          variantsId: variantIds,
          variantsComboId: comboId
      });
      return combinations;
  }

  const currentVariant = variants[index];
  for (const value of currentVariant.values) {
      const updatedCombo = [...currentCombo, value.value];
      combinations = generateVariantCombinations(variants, updatedCombo, index + 1, combinations);
  }

  return combinations;
}

export function convertPriceStringToNumber(priceString: string | number): number {
  // Remove commas from the string
  const stringWithoutCommas = (`${priceString}`).replace(/,/g, '');
  // Parse the string to a number
  const priceNumber = parseFloat(stringWithoutCommas);

  return priceNumber;
}

//utility function to split the price byy commas
export const formatPriceRealTime = (number: number | string | null | undefined): string => {

  return number ? convertPriceStringToNumber(number).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : '0';
};


export function getUniquePharmacies(productVariations: IProductVariation[]): IPharmacy[] {
  const uniquePharmaciesMap: Map<number, IPharmacy> = new Map();

  // Iterate through product variations and add unique pharmacies to the map
  productVariations.forEach(variation => {
      uniquePharmaciesMap.set(variation.PharmacyId, variation.Pharmacy);
  });

  // Convert the map values back to an array
  const uniquePharmaciesArray: IPharmacy[] = Array.from(uniquePharmaciesMap.values());

  return uniquePharmaciesArray;
}


// Table Paginations
export function generatePagination(currentPage: number, totalPages: number): (number|string)[] {
  const maxVisiblePages = 5;

  if (totalPages <= maxVisiblePages) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  const pages: (number | string)[] = [1];
  const ellipsis = '...';
  
  let startPage = Math.max(currentPage - 1, 2);
  let endPage = Math.min(currentPage + 1, totalPages - 1);

  if (startPage > 2) {
    pages.push(ellipsis);
  }

  for (let i = startPage; i <= endPage; i++) {
    pages.push(i);
  }

  if (endPage < totalPages - 1) {
    pages.push(ellipsis);
  }

  pages.push(totalPages);

  return pages;
}

export const getUserName = (userObj: any) => {
  return `${userObj.first_name} ${userObj.last_name}`
}

export const capitalizeFirstLetter = (str: string | undefined) => str ? str.charAt(0).toUpperCase() + str.slice(1) : "" 

// Updating arrays
// Define a generic type that ensures the object has an id property
interface Identifiable {
  id: number;
}

export function updateObjectInArray<T extends Identifiable>(array: T[], updatedObject: T): T[] {
  // Find the index of the object with the same id as the updated object
  const index = array.findIndex(item => item.id === updatedObject.id);

  // If the object is found, replace it with the updated object
  if (index !== -1) {
      array[index] = updatedObject;
  }

  // Return the updated array
  return array;
}

export function isDayPassed(targetDate: string, serverDate?: string): boolean {
  const currentDate = serverDate ? new Date(serverDate) : new Date();
  return new Date(targetDate) < currentDate;
}

export function getAge(dateString : string | undefined) {
  var today = new Date();
  var birthDate = new Date(dateString ?? '');
  var age = today.getFullYear() - birthDate.getFullYear();
  var m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
  }
  return age;
}

export function isDateGreaterThanFiveMinutesFromNow(dateString: string): boolean {
  const inputDate = new Date(dateString);
  const now = new Date();
  const fiveMinutesInMilliseconds = 5 * 60 * 1000;

  // Calculate the time difference
  const timeDifference = inputDate.getTime() - now.getTime();

  // Return true if the date is greater than 5 minutes from now
  return timeDifference > fiveMinutesInMilliseconds;
}
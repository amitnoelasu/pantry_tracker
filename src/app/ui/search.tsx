'use client';

// import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { useSearchParams, usePathname, useRouter  } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';

import SearchIcon from '@mui/icons-material/Search';
import { Box, Stack, TextField } from '@mui/material';

export default function Search({ placeholder }: { placeholder: string }) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleSearch = useDebouncedCallback((itemName) => {

    // console.log(term);
    console.log(`Searching... ${itemName}`);
    const params = new URLSearchParams(searchParams);
    if(itemName) {
      params.set('item', itemName);
    } else {
      params.delete('item');
    }
    replace(`${pathname}?${params.toString()}`);
  }, 300);
  return (
  <TextField variant="filled"

placeholder={placeholder}
onChange={(e) => {
  handleSearch(e.target.value);
}}
defaultValue={searchParams.get('item')?.toString()} />


  );
}

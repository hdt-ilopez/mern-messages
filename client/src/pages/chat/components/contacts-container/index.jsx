import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

import { CirclePlus } from 'lucide-react';
import { useState } from 'react';

const ContactsContainer = () => {
  const [conversations, setConversations] = useState([
    {
      _id: '1234',
      recipient: {
        _id: '0324844464',
        profilePicture: 'https://api.dicebear.com/9.x/bottts/svg',
        userName: 'bigbootylatina',
      },
      sender: {
        id: '66ec25dd1a25a1ee7fbebbb9',
        profilePicture:
          'data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20180%20180%22%20fill%3D%22none%22%20shape-rendering%3D%22auto%22%3E%3Cmetadata%20xmlns%3Ardf%3D%22http%3A%2F%2Fwww.w3.org%2F1999%2F02%2F22-rdf-syntax-ns%23%22%20xmlns%3Axsi%3D%22http%3A%2F%2Fwww.w3.org%2F2001%2FXMLSchema-instance%22%20xmlns%3Adc%3D%22http%3A%2F%2Fpurl.org%2Fdc%2Felements%2F1.1%2F%22%20xmlns%3Adcterms%3D%22http%3A%2F%2Fpurl.org%2Fdc%2Fterms%2F%22%3E%3Crdf%3ARDF%3E%3Crdf%3ADescription%3E%3Cdc%3Atitle%3EBottts%3C%2Fdc%3Atitle%3E%3Cdc%3Acreator%3EPablo%20Stanley%3C%2Fdc%3Acreator%3E%3Cdc%3Asource%20xsi%3Atype%3D%22dcterms%3AURI%22%3Ehttps%3A%2F%2Fbottts.com%2F%3C%2Fdc%3Asource%3E%3Cdcterms%3Alicense%20xsi%3Atype%3D%22dcterms%3AURI%22%3Ehttps%3A%2F%2Fbottts.com%2F%3C%2Fdcterms%3Alicense%3E%3Cdc%3Arights%3ERemix%20of%20%E2%80%9EBottts%E2%80%9D%20(https%3A%2F%2Fbottts.com%2F)%20by%20%E2%80%9EPablo%20Stanley%E2%80%9D%2C%20licensed%20under%20%E2%80%9EFree%20for%20personal%20and%20commercial%20use%E2%80%9D%20(https%3A%2F%2Fbottts.com%2F)%3C%2Fdc%3Arights%3E%3C%2Frdf%3ADescription%3E%3C%2Frdf%3ARDF%3E%3C%2Fmetadata%3E%3Cmask%20id%3D%22viewboxMask%22%3E%3Crect%20width%3D%22180%22%20height%3D%22180%22%20rx%3D%220%22%20ry%3D%220%22%20x%3D%220%22%20y%3D%220%22%20fill%3D%22%23fff%22%20%2F%3E%3C%2Fmask%3E%3Cg%20mask%3D%22url(%23viewboxMask)%22%3E%3Cg%20transform%3D%22translate(0%2066)%22%3E%3Cmask%20id%3D%22sidesAntenna01-a%22%20style%3D%22mask-type%3Aluminance%22%20maskUnits%3D%22userSpaceOnUse%22%20x%3D%226%22%20y%3D%2211%22%20width%3D%22156%22%20height%3D%2251%22%3E%3Cg%20fill%3D%22%23fff%22%3E%3Crect%20x%3D%226%22%20y%3D%2231%22%20width%3D%2236%22%20height%3D%2214%22%20rx%3D%224%22%2F%3E%3Crect%20x%3D%2218%22%20y%3D%2214%22%20width%3D%2236%22%20height%3D%2248%22%20rx%3D%224%22%2F%3E%3Crect%20x%3D%22126%22%20y%3D%2228%22%20width%3D%2236%22%20height%3D%2224%22%20rx%3D%224%22%2F%3E%3Cpath%20d%3D%22M11%2011h2v20h-2z%22%2F%3E%3C%2Fg%3E%3C%2Fmask%3E%3Cg%20mask%3D%22url(%23sidesAntenna01-a)%22%3E%3Cpath%20d%3D%22M0%200h180v76H0V0Z%22%20fill%3D%22%23fb8c00%22%2F%3E%3Cpath%20fill%3D%22%23fff%22%20fill-opacity%3D%22.3%22%20d%3D%22M0%200h180v76H0z%22%2F%3E%3Cpath%20fill%3D%22%23000%22%20fill-opacity%3D%22.1%22%20d%3D%22M0%2038h180v38H0z%22%2F%3E%3C%2Fg%3E%3Cpath%20fill%3D%22%23fff%22%20fill-opacity%3D%22.4%22%20d%3D%22M11%2011h2v20h-2z%22%2F%3E%3Ccircle%20cx%3D%2212%22%20cy%3D%228%22%20r%3D%224%22%20fill%3D%22%23FFEA8F%22%2F%3E%3Ccircle%20cx%3D%2213%22%20cy%3D%227%22%20r%3D%222%22%20fill%3D%22%23fff%22%2F%3E%3C%2Fg%3E%3Cg%20transform%3D%22translate(41)%22%3E%3Cmask%20id%3D%22topPyramid-a%22%20style%3D%22mask-type%3Aluminance%22%20maskUnits%3D%22userSpaceOnUse%22%20x%3D%2218%22%20y%3D%228%22%20width%3D%2264%22%20height%3D%2244%22%3E%3Cpath%20fill-rule%3D%22evenodd%22%20clip-rule%3D%22evenodd%22%20d%3D%22m50%208%2032%2044H18L50%208Z%22%20fill%3D%22%23fff%22%2F%3E%3C%2Fmask%3E%3Cg%20mask%3D%22url(%23topPyramid-a)%22%3E%3Cpath%20d%3D%22M0%200h100v52H0V0Z%22%20fill%3D%22%23fb8c00%22%2F%3E%3Cpath%20d%3D%22M0%200h100v52H0V0Z%22%20fill%3D%22%23fff%22%20fill-opacity%3D%22.3%22%2F%3E%3Cpath%20fill%3D%22%23fff%22%20fill-opacity%3D%22.8%22%20d%3D%22M50%204h30v48H50z%22%2F%3E%3C%2Fg%3E%3C%2Fg%3E%3Cg%20transform%3D%22translate(25%2044)%22%3E%3Cmask%20id%3D%22faceSquare01-a%22%20style%3D%22mask-type%3Aluminance%22%20maskUnits%3D%22userSpaceOnUse%22%20x%3D%220%22%20y%3D%220%22%20width%3D%22130%22%20height%3D%22120%22%3E%3Crect%20width%3D%22130%22%20height%3D%22120%22%20rx%3D%2218%22%20fill%3D%22%23fff%22%2F%3E%3C%2Fmask%3E%3Cg%20mask%3D%22url(%23faceSquare01-a)%22%3E%3Cpath%20d%3D%22M-2-2h134v124H-2V-2Z%22%20fill%3D%22%23fb8c00%22%2F%3E%3Cg%20transform%3D%22translate(-1%20-1)%22%3E%3Cpath%20d%3D%22M29.47%2034.03c-.1%200-.19-.06-.26-.12-.08-.07-.14-.12-.13.14.01.5.67-.05.4-.02ZM9.33%2048.92s.2-.56.03-.74c-.17.17-.18.42-.03.74ZM7.5%2052c.06%200%20.57-.28.48-.43-.12-.18-.49.34-.49.42ZM22.9%2059.14c-.13-.11-.53-.45-.28-.5.14-.03.5.36.32.54v-.01h-.01l-.03-.03ZM26.33%20108.46c.13-.02.66-.36.34-.45-.21-.04-.6.5-.34.46ZM52.63%2096.34c-.05.05-.2.09-.34.12-.15.04-.26.07-.16.1.19.06.84.16.5-.22ZM4.76%2043.63ZM5.1%2071.63l.06-.1c1.02%200-.68.19-.07.1ZM80.53%20109.92c.09-.02.1-.02.1-.11-.07.01-.08.02-.1.1ZM29.17%20117.78c.08-.02.09-.03.1-.11-.08.01-.09.02-.1.1ZM9.01%2049.75c.08-.02.09-.03.1-.12-.08.02-.09.03-.1.12ZM65.84%2048.74c.02.09.03.1.1.1%200-.08-.01-.09-.1-.1ZM107.28%2076.91c-.08.02-.09.03-.1.12.08-.02.09-.03.1-.12Z%22%20fill%3D%22%23000%22%20fill-opacity%3D%22.2%22%2F%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fg%3E%3Cg%20transform%3D%22translate(52%20124)%22%3E%3Cg%20fill%3D%22%23000%22%20fill-opacity%3D%22.6%22%3E%3Crect%20x%3D%2212%22%20y%3D%2212%22%20width%3D%224%22%20height%3D%228%22%20rx%3D%222%22%2F%3E%3Crect%20x%3D%2236%22%20y%3D%2212%22%20width%3D%224%22%20height%3D%228%22%20rx%3D%222%22%2F%3E%3Crect%20x%3D%2224%22%20y%3D%2212%22%20width%3D%224%22%20height%3D%228%22%20rx%3D%222%22%2F%3E%3Crect%20x%3D%2248%22%20y%3D%2212%22%20width%3D%224%22%20height%3D%228%22%20rx%3D%222%22%2F%3E%3Crect%20x%3D%2260%22%20y%3D%2212%22%20width%3D%224%22%20height%3D%228%22%20rx%3D%222%22%2F%3E%3C%2Fg%3E%3C%2Fg%3E%3Cg%20transform%3D%22translate(38%2076)%22%3E%3Cpath%20d%3D%22m25%2027.2%205.5%205.5c.5.4%201.2.4%201.6%200l1.6-1.6c.4-.5.4-1.2%200-1.6L28.2%2024l5.5-5.5c.4-.5.4-1.2%200-1.6l-1.6-1.6c-.5-.4-1.2-.4-1.6%200L25%2020.8l-5.5-5.5c-.5-.4-1.2-.4-1.6%200l-1.6%201.6c-.4.4-.4%201.1%200%201.6l5.5%205.5-5.5%205.5c-.4.5-.4%201.2%200%201.6l1.6%201.6c.5.4%201.2.4%201.6%200l5.5-5.5ZM79%2027.2l5.5%205.5c.5.4%201.2.4%201.6%200l1.6-1.6c.4-.5.4-1.2%200-1.6L82.2%2024l5.5-5.5c.4-.5.4-1.2%200-1.6l-1.6-1.6c-.5-.4-1.2-.4-1.6%200L79%2020.8l-5.5-5.5c-.5-.4-1.2-.4-1.6%200l-1.6%201.6c-.4.4-.4%201.1%200%201.6l5.5%205.5-5.5%205.5c-.4.5-.4%201.2%200%201.6l1.6%201.6c.5.4%201.2.4%201.6%200l5.5-5.5Z%22%20fill%3D%22%23000%22%20fill-opacity%3D%22.8%22%2F%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E',
        userName: 'isphynxz23',
      },
      messages: [
        {
          _id: '2169467181',
          senderId: '0324844464',
          receiverId: '66ec25dd1a25a1ee7fbebbb9',
          content:
            'Sup Papi i wanna get you in me like really bad bro like you should come right now',
          read: false,
          createdAt: '2:58p.m.',
        },
      ],
    },
    {
      _id: '56789',
      recipient: {
        _id: '0192830938098',
        profilePicture: 'https://api.dicebear.com/9.x/bottts/svg',
        userName: 'Rawrdoog',
      },
      sender: {
        id: '66ec25dd1a25a1ee7fbebbb9',
        profilePicture:
          'data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20180%20180%22%20fill%3D%22none%22%20shape-rendering%3D%22auto%22%3E%3Cmetadata%20xmlns%3Ardf%3D%22http%3A%2F%2Fwww.w3.org%2F1999%2F02%2F22-rdf-syntax-ns%23%22%20xmlns%3Axsi%3D%22http%3A%2F%2Fwww.w3.org%2F2001%2FXMLSchema-instance%22%20xmlns%3Adc%3D%22http%3A%2F%2Fpurl.org%2Fdc%2Felements%2F1.1%2F%22%20xmlns%3Adcterms%3D%22http%3A%2F%2Fpurl.org%2Fdc%2Fterms%2F%22%3E%3Crdf%3ARDF%3E%3Crdf%3ADescription%3E%3Cdc%3Atitle%3EBottts%3C%2Fdc%3Atitle%3E%3Cdc%3Acreator%3EPablo%20Stanley%3C%2Fdc%3Acreator%3E%3Cdc%3Asource%20xsi%3Atype%3D%22dcterms%3AURI%22%3Ehttps%3A%2F%2Fbottts.com%2F%3C%2Fdc%3Asource%3E%3Cdcterms%3Alicense%20xsi%3Atype%3D%22dcterms%3AURI%22%3Ehttps%3A%2F%2Fbottts.com%2F%3C%2Fdcterms%3Alicense%3E%3Cdc%3Arights%3ERemix%20of%20%E2%80%9EBottts%E2%80%9D%20(https%3A%2F%2Fbottts.com%2F)%20by%20%E2%80%9EPablo%20Stanley%E2%80%9D%2C%20licensed%20under%20%E2%80%9EFree%20for%20personal%20and%20commercial%20use%E2%80%9D%20(https%3A%2F%2Fbottts.com%2F)%3C%2Fdc%3Arights%3E%3C%2Frdf%3ADescription%3E%3C%2Frdf%3ARDF%3E%3C%2Fmetadata%3E%3Cmask%20id%3D%22viewboxMask%22%3E%3Crect%20width%3D%22180%22%20height%3D%22180%22%20rx%3D%220%22%20ry%3D%220%22%20x%3D%220%22%20y%3D%220%22%20fill%3D%22%23fff%22%20%2F%3E%3C%2Fmask%3E%3Cg%20mask%3D%22url(%23viewboxMask)%22%3E%3Cg%20transform%3D%22translate(0%2066)%22%3E%3Cmask%20id%3D%22sidesAntenna01-a%22%20style%3D%22mask-type%3Aluminance%22%20maskUnits%3D%22userSpaceOnUse%22%20x%3D%226%22%20y%3D%2211%22%20width%3D%22156%22%20height%3D%2251%22%3E%3Cg%20fill%3D%22%23fff%22%3E%3Crect%20x%3D%226%22%20y%3D%2231%22%20width%3D%2236%22%20height%3D%2214%22%20rx%3D%224%22%2F%3E%3Crect%20x%3D%2218%22%20y%3D%2214%22%20width%3D%2236%22%20height%3D%2248%22%20rx%3D%224%22%2F%3E%3Crect%20x%3D%22126%22%20y%3D%2228%22%20width%3D%2236%22%20height%3D%2224%22%20rx%3D%224%22%2F%3E%3Cpath%20d%3D%22M11%2011h2v20h-2z%22%2F%3E%3C%2Fg%3E%3C%2Fmask%3E%3Cg%20mask%3D%22url(%23sidesAntenna01-a)%22%3E%3Cpath%20d%3D%22M0%200h180v76H0V0Z%22%20fill%3D%22%23fb8c00%22%2F%3E%3Cpath%20fill%3D%22%23fff%22%20fill-opacity%3D%22.3%22%20d%3D%22M0%200h180v76H0z%22%2F%3E%3Cpath%20fill%3D%22%23000%22%20fill-opacity%3D%22.1%22%20d%3D%22M0%2038h180v38H0z%22%2F%3E%3C%2Fg%3E%3Cpath%20fill%3D%22%23fff%22%20fill-opacity%3D%22.4%22%20d%3D%22M11%2011h2v20h-2z%22%2F%3E%3Ccircle%20cx%3D%2212%22%20cy%3D%228%22%20r%3D%224%22%20fill%3D%22%23FFEA8F%22%2F%3E%3Ccircle%20cx%3D%2213%22%20cy%3D%227%22%20r%3D%222%22%20fill%3D%22%23fff%22%2F%3E%3C%2Fg%3E%3Cg%20transform%3D%22translate(41)%22%3E%3Cmask%20id%3D%22topPyramid-a%22%20style%3D%22mask-type%3Aluminance%22%20maskUnits%3D%22userSpaceOnUse%22%20x%3D%2218%22%20y%3D%228%22%20width%3D%2264%22%20height%3D%2244%22%3E%3Cpath%20fill-rule%3D%22evenodd%22%20clip-rule%3D%22evenodd%22%20d%3D%22m50%208%2032%2044H18L50%208Z%22%20fill%3D%22%23fff%22%2F%3E%3C%2Fmask%3E%3Cg%20mask%3D%22url(%23topPyramid-a)%22%3E%3Cpath%20d%3D%22M0%200h100v52H0V0Z%22%20fill%3D%22%23fb8c00%22%2F%3E%3Cpath%20d%3D%22M0%200h100v52H0V0Z%22%20fill%3D%22%23fff%22%20fill-opacity%3D%22.3%22%2F%3E%3Cpath%20fill%3D%22%23fff%22%20fill-opacity%3D%22.8%22%20d%3D%22M50%204h30v48H50z%22%2F%3E%3C%2Fg%3E%3C%2Fg%3E%3Cg%20transform%3D%22translate(25%2044)%22%3E%3Cmask%20id%3D%22faceSquare01-a%22%20style%3D%22mask-type%3Aluminance%22%20maskUnits%3D%22userSpaceOnUse%22%20x%3D%220%22%20y%3D%220%22%20width%3D%22130%22%20height%3D%22120%22%3E%3Crect%20width%3D%22130%22%20height%3D%22120%22%20rx%3D%2218%22%20fill%3D%22%23fff%22%2F%3E%3C%2Fmask%3E%3Cg%20mask%3D%22url(%23faceSquare01-a)%22%3E%3Cpath%20d%3D%22M-2-2h134v124H-2V-2Z%22%20fill%3D%22%23fb8c00%22%2F%3E%3Cg%20transform%3D%22translate(-1%20-1)%22%3E%3Cpath%20d%3D%22M29.47%2034.03c-.1%200-.19-.06-.26-.12-.08-.07-.14-.12-.13.14.01.5.67-.05.4-.02ZM9.33%2048.92s.2-.56.03-.74c-.17.17-.18.42-.03.74ZM7.5%2052c.06%200%20.57-.28.48-.43-.12-.18-.49.34-.49.42ZM22.9%2059.14c-.13-.11-.53-.45-.28-.5.14-.03.5.36.32.54v-.01h-.01l-.03-.03ZM26.33%20108.46c.13-.02.66-.36.34-.45-.21-.04-.6.5-.34.46ZM52.63%2096.34c-.05.05-.2.09-.34.12-.15.04-.26.07-.16.1.19.06.84.16.5-.22ZM4.76%2043.63ZM5.1%2071.63l.06-.1c1.02%200-.68.19-.07.1ZM80.53%20109.92c.09-.02.1-.02.1-.11-.07.01-.08.02-.1.1ZM29.17%20117.78c.08-.02.09-.03.1-.11-.08.01-.09.02-.1.1ZM9.01%2049.75c.08-.02.09-.03.1-.12-.08.02-.09.03-.1.12ZM65.84%2048.74c.02.09.03.1.1.1%200-.08-.01-.09-.1-.1ZM107.28%2076.91c-.08.02-.09.03-.1.12.08-.02.09-.03.1-.12Z%22%20fill%3D%22%23000%22%20fill-opacity%3D%22.2%22%2F%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fg%3E%3Cg%20transform%3D%22translate(52%20124)%22%3E%3Cg%20fill%3D%22%23000%22%20fill-opacity%3D%22.6%22%3E%3Crect%20x%3D%2212%22%20y%3D%2212%22%20width%3D%224%22%20height%3D%228%22%20rx%3D%222%22%2F%3E%3Crect%20x%3D%2236%22%20y%3D%2212%22%20width%3D%224%22%20height%3D%228%22%20rx%3D%222%22%2F%3E%3Crect%20x%3D%2224%22%20y%3D%2212%22%20width%3D%224%22%20height%3D%228%22%20rx%3D%222%22%2F%3E%3Crect%20x%3D%2248%22%20y%3D%2212%22%20width%3D%224%22%20height%3D%228%22%20rx%3D%222%22%2F%3E%3Crect%20x%3D%2260%22%20y%3D%2212%22%20width%3D%224%22%20height%3D%228%22%20rx%3D%222%22%2F%3E%3C%2Fg%3E%3C%2Fg%3E%3Cg%20transform%3D%22translate(38%2076)%22%3E%3Cpath%20d%3D%22m25%2027.2%205.5%205.5c.5.4%201.2.4%201.6%200l1.6-1.6c.4-.5.4-1.2%200-1.6L28.2%2024l5.5-5.5c.4-.5.4-1.2%200-1.6l-1.6-1.6c-.5-.4-1.2-.4-1.6%200L25%2020.8l-5.5-5.5c-.5-.4-1.2-.4-1.6%200l-1.6%201.6c-.4.4-.4%201.1%200%201.6l5.5%205.5-5.5%205.5c-.4.5-.4%201.2%200%201.6l1.6%201.6c.5.4%201.2.4%201.6%200l5.5-5.5ZM79%2027.2l5.5%205.5c.5.4%201.2.4%201.6%200l1.6-1.6c.4-.5.4-1.2%200-1.6L82.2%2024l5.5-5.5c.4-.5.4-1.2%200-1.6l-1.6-1.6c-.5-.4-1.2-.4-1.6%200L79%2020.8l-5.5-5.5c-.5-.4-1.2-.4-1.6%200l-1.6%201.6c-.4.4-.4%201.1%200%201.6l5.5%205.5-5.5%205.5c-.4.5-.4%201.2%200%201.6l1.6%201.6c.5.4%201.2.4%201.6%200l5.5-5.5Z%22%20fill%3D%22%23000%22%20fill-opacity%3D%22.8%22%2F%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E',
        userName: 'isphynxz23',
      },
      messages: [
        {
          _id: '2169467181',
          senderId: '0324844464',
          receiverId: '66ec25dd1a25a1ee7fbebbb9',
          content: 'Oh fuck',
          read: false,
          createdAt: '2:58p.m.',
        },
      ],
    },
  ]);

  const handleSelectedMessage = (conversationId, messageId) => {
    setConversations((prevConversations) =>
      prevConversations.map((conversation) => {
        if (conversation._id === conversationId) {
          return {
            ...conversation,
            messages: conversation.messages.map((message) =>
              message._id === messageId ? { ...message, read: true } : message
            ),
          };
        }
        return conversation;
      })
    );
  };

  return (
    <div className="relative md:w-[400px] bg-[#1b1c24] border-r-2 border-[#2f303b] w-screen">
      <div className="">
        <h1 className="text-4xl font-bold mb-12 p-4">Logo</h1>
        <div className="flex justify-between items-center text-[#727697] border-b-2 border-[#2f303b] pb-2 mb-3 px-2">
          <h2 className="uppercase font-bold text-lg">Messages</h2>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <Button
                  variant="outline"
                  size="icon"
                  className="bg-transparent border-none hover:bg-transparent hover:text-white transition-all duration-300"
                >
                  <CirclePlus />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>New Message</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <div>
          {conversations.map((conversation) => (
            <div
              key={conversation._id}
              className="flex items-center gap-2 mb-4 cursor-pointer hover:bg-[#2f303b] p-2 rounded-md"
              onClick={() =>
                handleSelectedMessage(
                  conversation._id,
                  conversation.messages[0]._id
                )
              }
            >
              <Avatar className="bg-[#727697]">
                <img
                  src={conversation.recipient.profilePicture}
                  alt={`${conversation.recipient.userName}'s Profile Picture`}
                  className="rounded-full"
                />
              </Avatar>
              <div className="flex-1 overflow-hidden">
                <p
                  className={`${
                    conversation.messages[0].read === false
                      ? 'font-bold'
                      : 'text-white/70'
                  } capitalize`}
                >
                  {conversation.recipient.userName}
                </p>
                <p
                  className={`${
                    conversation.messages[0].read
                      ? 'text-[#727697]'
                      : 'text-white font-bold'
                  } text-sm truncate overflow-hidden text-ellipsis whitespace-nowrap max-w-full`}
                >
                  {conversation.messages[0]?.content}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ContactsContainer;

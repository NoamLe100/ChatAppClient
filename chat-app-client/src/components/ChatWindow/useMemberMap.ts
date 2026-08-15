import { useEffect, useState } from 'react';
import { getChatDetails } from '../../api/chat';
import type { Chat } from '../../types';

export function useMemberMap(selectedChatId: number | null) {
  const [memberMap, setMemberMap] = useState<Record<number, string>>({});

  useEffect(() => {
    if (!selectedChatId) {
      setMemberMap({});
      return;
    }
    getChatDetails(selectedChatId).then((data: Chat) => {
      const map: Record<number, string> = {};
      data.members.forEach((m) => {
        map[m.user.id] = m.user.name || m.user.userName;
      });
      setMemberMap(map);
    });
  }, [selectedChatId]);

  return memberMap;
}

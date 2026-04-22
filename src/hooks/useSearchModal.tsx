import { useCallback, useRef, useState } from "react";
import { SearchBar } from "@components/Search/SearchBar";
import { Popup, type PopupHandle } from "@components/UI/Popup";

export const useSearchModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const popupRef = useRef<PopupHandle>(null);

  const openSearchModal = useCallback(() => setIsOpen(true), []);
  const closeSearchModal = useCallback(() => setIsOpen(false), []);

  const externalCloseSearchModal = useCallback(() => {
    popupRef.current?.startClosing();
  }, []);

  const isOpenSearchModal = isOpen;

  const SearchModal = isOpen ? (
    <Popup ref={popupRef} kind="search" onClose={closeSearchModal}>
      {({ isMounted, startClosing }) => (
        <SearchBar
          kind="popup"
          isOpen={isMounted}
          onResetSearch={startClosing}
        />
      )}
    </Popup>
  ) : null;

  return {
    isOpenSearchModal,
    openSearchModal,
    closeSearchModal,
    externalCloseSearchModal,
    SearchModal,
  };
};

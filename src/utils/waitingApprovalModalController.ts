let showModalSetter: ((value: boolean) => void) | null = null;

export const registerWaitingApprovalModalSetter = (
  setter: (value: boolean) => void
) => {
  showModalSetter = setter;
};

export const triggerWaitingApprovalModal = () => {
  if (showModalSetter) {
    showModalSetter(true);
  }
};

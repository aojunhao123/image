import CloseOutlined from '@ant-design/icons/CloseOutlined';
import LeftOutlined from '@ant-design/icons/LeftOutlined';
import RightOutlined from '@ant-design/icons/RightOutlined';
import RotateLeftOutlined from '@ant-design/icons/RotateLeftOutlined';
import RotateRightOutlined from '@ant-design/icons/RotateRightOutlined';
import ZoomInOutlined from '@ant-design/icons/ZoomInOutlined';
import ZoomOutOutlined from '@ant-design/icons/ZoomOutOutlined';
import { spyElementPrototypes } from '@rc-component/util/lib/test/domHook';
import { act, createEvent, fireEvent, render } from '@testing-library/react';
import React from 'react';

jest.mock('../src/Preview', () => {
  const MockPreview = (props: any) => {
    global._previewProps = props;

    let Preview = jest.requireActual('../src/Preview');
    Preview = Preview.default || Preview;

    return <Preview {...props} />;
  };

  return MockPreview;
});

import Image from '../src';

describe('Preview', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  const fireMouseEvent = (
    eventName: 'mouseDown' | 'mouseMove' | 'mouseUp',
    element: Element | Window,
    info: {
      pageX?: number;
      pageY?: number;
      button?: number;
    } = {},
  ) => {
    const event = createEvent[eventName](element);
    Object.keys(info).forEach(key => {
      Object.defineProperty(event, key, {
        get: () => info[key],
      });
    });

    act(() => {
      fireEvent(element, event);
    });

    act(() => {
      jest.runAllTimers();
    });
  };

  it('Show preview and close', () => {
    const onPreviewCloseMock = jest.fn();
    const { container } = render(
      <Image
        src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
        preview={{
          onOpenChange: onPreviewCloseMock,
        }}
      />,
    );

    // Click Image
    fireEvent.click(container.querySelector('.rc-image'));
    expect(onPreviewCloseMock).toHaveBeenCalledWith(true);

    act(() => {
      jest.runAllTimers();
    });
    expect(document.querySelector('.rc-image-preview')).toBeTruthy();

    // Click Mask
    onPreviewCloseMock.mockReset();
    fireEvent.click(document.querySelector('.rc-image-preview-mask'));
    expect(onPreviewCloseMock).toHaveBeenCalledWith(false);

    // Click Image again
    fireEvent.click(container.querySelector('.rc-image'));
    act(() => {
      jest.runAllTimers();
    });

    // Click Close Button
    onPreviewCloseMock.mockReset();
    fireEvent.click(document.querySelector('.rc-image-preview-close'));
    expect(onPreviewCloseMock).toHaveBeenCalledWith(false);
  });

  it('Unmount', () => {
    const { container, unmount } = render(
      <Image src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png" />,
    );

    fireEvent.click(container.querySelector('.rc-image'));
    act(() => {
      jest.runAllTimers();
    });

    expect(() => {
      unmount();
    }).not.toThrow();
  });

  it('Rotate', () => {
    const { container } = render(
      <Image src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png" />,
    );

    fireEvent.click(container.querySelector('.rc-image'));
    act(() => {
      jest.runAllTimers();
    });

    fireEvent.click(document.querySelectorAll('.rc-image-preview-actions-action')[3]);
    act(() => {
      jest.runAllTimers();
    });
    expect(document.querySelector('.rc-image-preview-img')).toHaveStyle({
      transform: 'translate3d(0px, 0px, 0) scale3d(1, 1, 1) rotate(90deg)',
    });

    fireEvent.click(document.querySelectorAll('.rc-image-preview-actions-action')[2]);
    act(() => {
      jest.runAllTimers();
    });
    expect(document.querySelector('.rc-image-preview-img')).toHaveStyle({
      transform: 'translate3d(0px, 0px, 0) scale3d(1, 1, 1) rotate(0deg)',
    });
  });

  it('Flip', () => {
    const { container } = render(
      <Image src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png" />,
    );

    fireEvent.click(container.querySelector('.rc-image'));
    act(() => {
      jest.runAllTimers();
    });

    fireEvent.click(document.querySelectorAll('.rc-image-preview-actions-action')[1]);
    act(() => {
      jest.runAllTimers();
    });
    expect(document.querySelector('.rc-image-preview-img')).toHaveStyle({
      transform: 'translate3d(0px, 0px, 0) scale3d(-1, 1, 1) rotate(0deg)',
    });

    fireEvent.click(document.querySelectorAll('.rc-image-preview-actions-action')[0]);
    act(() => {
      jest.runAllTimers();
    });
    expect(document.querySelector('.rc-image-preview-img')).toHaveStyle({
      transform: 'translate3d(0px, 0px, 0) scale3d(-1, -1, 1) rotate(0deg)',
    });

    fireEvent.click(document.querySelectorAll('.rc-image-preview-actions-action')[1]);
    act(() => {
      jest.runAllTimers();
    });
    expect(document.querySelector('.rc-image-preview-img')).toHaveStyle({
      transform: 'translate3d(0px, 0px, 0) scale3d(1, -1, 1) rotate(0deg)',
    });

    fireEvent.click(document.querySelectorAll('.rc-image-preview-actions-action')[0]);
    act(() => {
      jest.runAllTimers();
    });
    expect(document.querySelector('.rc-image-preview-img')).toHaveStyle({
      transform: 'translate3d(0px, 0px, 0) scale3d(1, 1, 1) rotate(0deg)',
    });
  });

  it('Scale', () => {
    const { container } = render(
      <Image src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png" />,
    );

    fireEvent.click(container.querySelector('.rc-image'));
    act(() => {
      jest.runAllTimers();
    });

    fireEvent.click(document.querySelectorAll('.rc-image-preview-actions-action')[5]);
    act(() => {
      jest.runAllTimers();
    });
    expect(document.querySelector('.rc-image-preview-img')).toHaveStyle({
      transform: 'translate3d(-256px, -192px, 0) scale3d(1.5, 1.5, 1) rotate(0deg)',
    });

    fireEvent.click(document.querySelectorAll('.rc-image-preview-actions-action')[4]);
    act(() => {
      jest.runAllTimers();
    });
    expect(document.querySelector('.rc-image-preview-img')).toHaveStyle({
      transform: 'translate3d(0px, 0px, 0) scale3d(1, 1, 1) rotate(0deg)',
    });

    fireEvent.click(document.querySelectorAll('.rc-image-preview-actions-action')[5]);
    act(() => {
      jest.runAllTimers();
    });
    expect(document.querySelector('.rc-image-preview-img')).toHaveStyle({
      transform: 'translate3d(-256px, -192px, 0) scale3d(1.5, 1.5, 1) rotate(0deg)',
    });

    fireEvent.click(document.querySelectorAll('.rc-image-preview-actions-action')[4]);
    act(() => {
      jest.runAllTimers();
    });
    expect(document.querySelector('.rc-image-preview-img')).toHaveStyle({
      transform: 'translate3d(0px, 0px, 0) scale3d(1, 1, 1) rotate(0deg)',
    });

    fireEvent.wheel(document.querySelector('.rc-image-preview-img'), {
      deltaY: -50,
    });

    act(() => {
      jest.runAllTimers();
    });
    expect(document.querySelector('.rc-image-preview-img')).toHaveStyle({
      transform: 'translate3d(0px, 0px, 0) scale3d(1.25, 1.25, 1) rotate(0deg)',
    });

    fireEvent.wheel(document.querySelector('.rc-image-preview-img'), {
      deltaY: 50,
    });
    act(() => {
      jest.runAllTimers();
    });
    expect(document.querySelector('.rc-image-preview-img')).toHaveStyle({
      transform: 'translate3d(0px, 0px, 0) scale3d(1, 1, 1) rotate(0deg)',
    });

    for (let i = 0; i < 50; i++) {
      fireEvent.wheel(document.querySelector('.rc-image-preview-img'), {
        deltaY: -100,
      });
      act(() => {
        jest.runAllTimers();
      });
    }
    expect(document.querySelector('.rc-image-preview-img')).toHaveStyle({
      transform: 'translate3d(0px, 0px, 0) scale3d(50, 50, 1) rotate(0deg)',
    });
  });

  it('scaleStep = 1', () => {
    const { container } = render(
      <Image
        src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
        preview={{
          scaleStep: 1,
        }}
      />,
    );

    fireEvent.click(container.querySelector('.rc-image'));
    act(() => {
      jest.runAllTimers();
    });

    fireEvent.click(document.querySelectorAll('.rc-image-preview-actions-action')[4]);
    act(() => {
      jest.runAllTimers();
    });
    expect(document.querySelector('.rc-image-preview-img')).toHaveStyle({
      transform: 'translate3d(0px, 0px, 0) scale3d(1, 1, 1) rotate(0deg)',
    });

    fireEvent.click(document.querySelectorAll('.rc-image-preview-actions-action')[5]);
    act(() => {
      jest.runAllTimers();
    });
    expect(document.querySelector('.rc-image-preview-img')).toHaveStyle({
      transform: 'translate3d(-512px, -384px, 0) scale3d(2, 2, 1) rotate(0deg)',
    });

    fireEvent.click(document.querySelectorAll('.rc-image-preview-actions-action')[4]);
    act(() => {
      jest.runAllTimers();
    });
    expect(document.querySelector('.rc-image-preview-img')).toHaveStyle({
      transform: 'translate3d(0px, 0px, 0) scale3d(1, 1, 1) rotate(0deg)',
    });

    fireEvent.wheel(document.querySelector('.rc-image-preview-img'), {
      deltaY: -50,
    });

    act(() => {
      jest.runAllTimers();
    });
    expect(document.querySelector('.rc-image-preview-img')).toHaveStyle({
      transform: 'translate3d(0px, 0px, 0) scale3d(1.5, 1.5, 1) rotate(0deg)',
    });

    fireEvent.wheel(document.querySelector('.rc-image-preview-img'), {
      deltaY: 50,
    });
    act(() => {
      jest.runAllTimers();
    });
    expect(document.querySelector('.rc-image-preview-img')).toHaveStyle({
      transform: 'translate3d(0px, 0px, 0) scale3d(1, 1, 1) rotate(0deg)',
    });
  });

  it('Reset scale on double click', () => {
    const { container } = render(
      <Image src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png" />,
    );

    fireEvent.click(container.querySelector('.rc-image'));
    act(() => {
      jest.runAllTimers();
    });

    fireEvent.click(document.querySelectorAll('.rc-image-preview-actions-action')[5]);
    act(() => {
      jest.runAllTimers();
    });
    expect(document.querySelector('.rc-image-preview-img')).toHaveStyle({
      transform: 'translate3d(-256px, -192px, 0) scale3d(1.5, 1.5, 1) rotate(0deg)',
    });

    fireEvent.dblClick(document.querySelector('.rc-image-preview-img'));
    act(() => {
      jest.runAllTimers();
    });
    expect(document.querySelector('.rc-image-preview-img')).toHaveStyle({
      transform: 'translate3d(0px, 0px, 0) scale3d(1, 1, 1) rotate(0deg)',
    });
  });

  it('Reset position on double click', () => {
    const { container } = render(
      <Image src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png" />,
    );

    fireEvent.click(container.querySelector('.rc-image'));
    act(() => {
      jest.runAllTimers();
    });

    fireMouseEvent('mouseDown', document.querySelector('.rc-image-preview-img'), {
      pageX: 0,
      pageY: 0,
      button: 0,
    });
    fireMouseEvent('mouseMove', window, {
      pageX: 50,
      pageY: 50,
    });

    expect(document.querySelector('.rc-image-preview-img')).toHaveStyle({
      transform: 'translate3d(50px, 50px, 0) scale3d(1, 1, 1) rotate(0deg)',
    });

    fireEvent.dblClick(document.querySelector('.rc-image-preview-img'));
    act(() => {
      jest.runAllTimers();
    });
    expect(document.querySelector('.rc-image-preview-img')).toHaveStyle({
      transform: 'translate3d(75px, 75px, 0) scale3d(1.5, 1.5, 1) rotate(0deg)',
    });
  });

  it('Mouse Event', () => {
    const clientWidthMock = jest
      .spyOn(document.documentElement, 'clientWidth', 'get')
      .mockImplementation(() => 1080);

    let offsetWidth = 200;
    let offsetHeight = 100;
    let left = 0;
    let top = 0;

    const imgEleMock = spyElementPrototypes(HTMLImageElement, {
      offsetWidth: {
        get: () => offsetWidth,
      },
      offsetHeight: {
        get: () => offsetHeight,
      },
      getBoundingClientRect: () => {
        return { left, top };
      },
    });
    const { container } = render(
      <Image src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png" />,
    );

    fireEvent.click(container.querySelector('.rc-image'));

    fireMouseEvent('mouseDown', document.querySelector('.rc-image-preview-img'), {
      pageX: 0,
      pageY: 0,
      button: 2,
    });
    expect(document.querySelector('.rc-image-preview-moving')).toBeFalsy();

    fireMouseEvent('mouseDown', document.querySelector('.rc-image-preview-img'), {
      pageX: 0,
      pageY: 0,
      button: 0,
    });
    expect(document.querySelector('.rc-image-preview-moving')).toBeTruthy();

    fireMouseEvent('mouseMove', window, {
      pageX: 50,
      pageY: 50,
    });
    expect(document.querySelector('.rc-image-preview-img')).toHaveStyle({
      transform: 'translate3d(50px, 50px, 0) scale3d(1, 1, 1) rotate(0deg)',
    });

    fireMouseEvent('mouseUp', window);

    expect(document.querySelector('.rc-image-preview-img')).toHaveStyle({
      transform: 'translate3d(0px, 0px, 0) scale3d(1, 1, 1) rotate(0deg)',
    });

    fireMouseEvent('mouseDown', document.querySelector('.rc-image-preview-img'), {
      pageX: 0,
      pageY: 0,
      button: 0,
    });

    fireMouseEvent('mouseUp', window);

    expect(document.querySelector('.rc-image-preview-img')).toHaveStyle({
      transform: 'translate3d(0px, 0px, 0) scale3d(1, 1, 1) rotate(0deg)',
    });

    fireMouseEvent('mouseDown', document.querySelector('.rc-image-preview-img'), {
      pageX: 0,
      pageY: 0,
      button: 0,
    });

    fireMouseEvent('mouseMove', window, {
      pageX: 1,
      pageY: 1,
    });

    left = 100;
    top = 100;
    offsetWidth = 2000;
    offsetHeight = 1000;
    fireMouseEvent('mouseUp', window);

    expect(document.querySelector('.rc-image-preview-img')).toHaveStyle({
      transform: 'translate3d(460px, 116px, 0) scale3d(1, 1, 1) rotate(0deg)',
    });

    fireMouseEvent('mouseDown', document.querySelector('.rc-image-preview-img'), {
      pageX: 0,
      pageY: 0,
      button: 0,
    });

    left = -200;
    top = -200;
    offsetWidth = 2000;
    offsetHeight = 1000;

    fireMouseEvent('mouseUp', window);

    expect(document.querySelector('.rc-image-preview-img')).toHaveStyle({
      transform: 'translate3d(460px, 116px, 0) scale3d(1, 1, 1) rotate(0deg)',
    });

    fireMouseEvent('mouseDown', document.querySelector('.rc-image-preview-img'), {
      pageX: 0,
      pageY: 0,
      button: 0,
    });

    fireMouseEvent('mouseMove', window, {
      pageX: 1,
      pageY: 1,
    });

    left = -200;
    top = -200;
    offsetWidth = 1000;
    offsetHeight = 500;

    fireMouseEvent('mouseUp', window);

    expect(document.querySelector('.rc-image-preview-img')).toHaveStyle({
      transform: 'translate3d(0px, 0px, 0) scale3d(1, 1, 1) rotate(0deg)',
    });

    fireMouseEvent('mouseDown', document.querySelector('.rc-image-preview-img'), {
      pageX: 0,
      pageY: 0,
      button: 0,
    });

    fireMouseEvent('mouseMove', window, {
      pageX: 1,
      pageY: 1,
    });

    left = -200;
    top = -200;
    offsetWidth = 1200;
    offsetHeight = 600;
    fireMouseEvent('mouseUp', window);

    expect(document.querySelector('.rc-image-preview-img')).toHaveStyle({
      transform: 'translate3d(-60px, -84px, 0) scale3d(1, 1, 1) rotate(0deg)',
    });

    fireMouseEvent('mouseDown', document.querySelector('.rc-image-preview-img'), {
      pageX: 0,
      pageY: 0,
      button: 0,
    });

    fireMouseEvent('mouseMove', window, {
      pageX: 1,
      pageY: 1,
    });

    left = -200;
    top = -200;
    offsetWidth = 1000;
    offsetHeight = 900;
    fireMouseEvent('mouseUp', window);

    expect(document.querySelector('.rc-image-preview-img')).toHaveStyle({
      transform: 'translate3d(-40px, -66px, 0) scale3d(1, 1, 1) rotate(0deg)',
    });

    fireEvent.wheel(document.querySelector('.rc-image-preview-img'), {
      deltaY: -50,
    });

    fireMouseEvent('mouseDown', document.querySelector('.rc-image-preview-img'), {
      pageX: 0,
      pageY: 0,
      button: 0,
    });

    fireMouseEvent('mouseMove', window, {
      pageX: 1,
      pageY: 1,
    });

    fireMouseEvent('mouseUp', window);

    expect(document.querySelector('.rc-image-preview-img')).toHaveStyle({
      transform: 'translate3d(-85px, -65px, 0) scale3d(1.25, 1.25, 1) rotate(0deg)',
    });

    // Clear
    clientWidthMock.mockRestore();
    imgEleMock.mockRestore();
    jest.restoreAllMocks();
  });

  it('PreviewGroup render', () => {
    const { container } = render(
      <Image.PreviewGroup
        icons={{
          rotateLeft: <RotateLeftOutlined />,
          rotateRight: <RotateRightOutlined />,
          zoomIn: <ZoomInOutlined />,
          zoomOut: <ZoomOutOutlined />,
          close: <CloseOutlined />,
          left: <LeftOutlined />,
          right: <RightOutlined />,
        }}
      >
        <Image
          className="group-1"
          src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
        />
        <Image
          className="group-2"
          src="https://gw.alipayobjects.com/mdn/rms_08e378/afts/img/A*P0S-QIRUbsUAAAAAAAAAAABkARQnAQ"
        />
      </Image.PreviewGroup>,
    );

    fireEvent.click(container.querySelector('.rc-image'));
    act(() => {
      jest.runAllTimers();
    });

    expect(document.querySelectorAll('.rc-image-preview-actions-action')).toHaveLength(6);
  });

  it('preview placeholder', () => {
    render(
      <Image
        src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
        classNames={{
          cover: 'bamboo',
        }}
        preview={{
          cover: 'Bamboo Is Light',
        }}
      />,
    );

    expect(document.querySelector('.rc-image-cover').textContent).toEqual('Bamboo Is Light');
    expect(document.querySelector('.rc-image-cover')).toHaveClass('bamboo');
  });

  it('previewSrc', () => {
    const src =
      'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png?x-oss-process=image/auto-orient,1/resize,p_10/quality,q_10';
    const previewSrc =
      'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png';
    const { container } = render(<Image src={src} preview={{ src: previewSrc }} />);

    expect(container.querySelector('.rc-image-img')).toHaveAttribute('src', src);
    expect(document.querySelector('.rc-image-preview')).toBeFalsy();

    fireEvent.click(container.querySelector('.rc-image'));
    act(() => {
      jest.runAllTimers();
    });

    expect(document.querySelector('.rc-image-preview')).toBeTruthy();
    expect(document.querySelector('.rc-image-preview-img')).toHaveAttribute('src', previewSrc);
  });

  it('Customize preview props', () => {
    const src = 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png';
    render(
      <Image
        src={src}
        preview={{
          open: true,
          motionName: 'abc',
          closeIcon: null,
        }}
      />,
    );

    expect(global._previewProps).toEqual(
      expect.objectContaining({
        motionName: 'abc',
      }),
    );

    expect(document.querySelector('.rc-image-preview-close')).toBeFalsy();
  });

  it('Customize Group preview props', () => {
    const src = 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png';
    render(
      <Image.PreviewGroup preview={{ open: true, motionName: 'abc' }}>
        <Image src={src} />
      </Image.PreviewGroup>,
    );

    expect(global._previewProps).toEqual(
      expect.objectContaining({
        motionName: 'abc',
      }),
    );
  });

  it('add rootClassName should be correct', () => {
    const src = 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png';
    const { container } = render(<Image src={src} rootClassName="custom-className" />);

    expect(container.querySelector('.rc-image.custom-className')).toBeTruthy();
  });

  it('add rootClassName should be correct when open preview', () => {
    const src = 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png';
    const previewSrc =
      'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png';

    const { container } = render(
      <Image src={src} preview={{ src: previewSrc }} rootClassName="custom-className" />,
    );
    expect(container.querySelector('.rc-image.custom-className .rc-image-img')).toHaveAttribute(
      'src',
      src,
    );
    expect(document.querySelector('.rc-image-preview.custom-className')).toBeFalsy();

    fireEvent.click(container.querySelector('.rc-image'));
    act(() => {
      jest.runAllTimers();
    });

    expect(document.querySelector('.rc-image-preview.custom-className')).toBeTruthy();
    expect(document.querySelector('.rc-image-preview.custom-className img')).toHaveAttribute(
      'src',
      previewSrc,
    );
    expect(document.querySelectorAll('.custom-className')).toHaveLength(2);
  });

  it('preview.rootClassName should be correct', () => {
    const src = 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png';
    render(
      <Image
        src={src}
        preview={{
          open: true,
          rootClassName: 'custom-className',
        }}
      />,
    );

    expect(document.querySelector('.rc-image-preview.custom-className')).toBeTruthy();
  });

  it('rootClassName on both side but classNames.root on single side', () => {
    const src = 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png';
    render(
      <Image
        src={src}
        rootClassName="both"
        classNames={{
          root: 'image-root',
          popup: {
            root: 'preview-root',
          },
        }}
        styles={{
          root: {
            color: 'red',
          },
          popup: {
            root: {
              background: 'green',
            },
          },
        }}
        preview={{
          open: true,
        }}
      />,
    );

    expect(document.querySelectorAll('.both')).toHaveLength(2);
    expect(document.querySelectorAll('.rc-image.image-root')).toHaveLength(1);
    expect(document.querySelectorAll('.rc-image-preview.preview-root')).toHaveLength(1);

    expect(document.querySelector('.rc-image.image-root')).toHaveStyle({
      color: 'red',
    });
    expect(document.querySelector('.rc-image.image-root')).not.toHaveStyle({
      background: 'green',
    });
    expect(document.querySelector('.rc-image-preview.preview-root')).toHaveStyle({
      background: 'green',
    });
    expect(document.querySelector('.rc-image-preview.preview-root')).not.toHaveStyle({
      color: 'red',
    });
  });

  it('if async src set should be correct', () => {
    const src =
      'https://gw.alipayobjects.com/mdn/rms_08e378/afts/img/A*P0S-QIRUbsUAAAAAAAAAAABkARQnAQ';
    const AsyncImage = ({ src: imgSrc }) => {
      const normalSrc =
        'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png';
      return (
        <Image.PreviewGroup>
          <Image src={imgSrc} />
          <Image src={normalSrc} />
        </Image.PreviewGroup>
      );
    };

    const { container, rerender } = render(<AsyncImage src="" />);
    rerender(<AsyncImage src={src} />);

    fireEvent.click(container.querySelector('.rc-image'));

    act(() => {
      jest.runAllTimers();
    });

    expect(document.querySelector('.rc-image-preview img')).toHaveAttribute('src', src);

    expect(document.querySelector('.rc-image-preview-switch-prev')).toHaveClass(
      'rc-image-preview-switch-disabled',
    );
  });

  it('pass img common props to previewed image', () => {
    const { container } = render(
      <Image
        src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
        referrerPolicy="no-referrer"
      />,
    );

    fireEvent.click(container.querySelector('.rc-image'));
    act(() => {
      jest.runAllTimers();
    });

    expect(document.querySelector('.rc-image-preview-img')).toHaveAttribute(
      'referrerPolicy',
      'no-referrer',
    );
  });

  describe('actionsRender', () => {
    it('single', () => {
      const printImage = jest.fn();
      const { container } = render(
        <Image
          src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
          alt="alt"
          width={200}
          height={200}
          preview={{
            actionsRender: (_, { icons, image, actions }) => {
              printImage(image);
              return (
                <>
                  <div id="flipY" onClick={() => actions.onFlipY()}>
                    {icons.flipYIcon}
                  </div>
                  <div id="flipX" onClick={() => actions.onFlipX()}>
                    {icons.flipXIcon}
                  </div>
                  <div id="zoomIn" onClick={() => actions.onZoomIn()}>
                    {icons.zoomInIcon}
                  </div>
                  <div id="zoomOut" onClick={() => actions.onZoomOut()}>
                    {icons.zoomOutIcon}
                  </div>
                  <div id="rotateLeft" onClick={() => actions.onRotateLeft()}>
                    {icons.rotateLeftIcon}
                  </div>
                  <div id="rotateRight" onClick={() => actions.onRotateRight()}>
                    {icons.rotateRightIcon}
                  </div>
                  <div id="reset" onClick={() => actions.onReset()}>
                    reset
                  </div>
                </>
              );
            },
          }}
        />,
      );

      fireEvent.click(container.querySelector('.rc-image'));
      act(() => {
        jest.runAllTimers();
      });

      expect(printImage).toHaveBeenCalledWith({
        alt: 'alt',
        height: 200,
        url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
        width: 200,
      });
      // flipY
      fireEvent.click(document.getElementById('flipY'));
      act(() => {
        jest.runAllTimers();
      });
      fireEvent.click(document.getElementById('flipX'));
      act(() => {
        jest.runAllTimers();
      });
      fireEvent.click(document.getElementById('zoomIn'));
      act(() => {
        jest.runAllTimers();
      });
      fireEvent.click(document.getElementById('rotateLeft'));
      act(() => {
        jest.runAllTimers();
      });
      expect(document.querySelector('.rc-image-preview-img')).toHaveStyle({
        transform: 'translate3d(-256px, -192px, 0) scale3d(-1.5, -1.5, 1) rotate(-90deg)',
      });

      // reset
      fireEvent.click(document.getElementById('reset'));
      act(() => {
        jest.runAllTimers();
      });
      expect(document.querySelector('.rc-image-preview-img')).toHaveStyle({
        transform: 'translate3d(0px, 0px, 0) scale3d(1, 1, 1) rotate(0deg)',
      });
    });

    it('switch', () => {
      const onChange = jest.fn();
      render(
        <Image.PreviewGroup
          items={[
            {
              src: 'src1',
            },
            {
              src: 'src2',
            },
            {
              src: 'src3',
            },
          ]}
          preview={{
            open: true,
            current: 1,
            actionsRender: (_, { icons, actions }) => {
              return (
                <>
                  {icons.prevIcon}
                  {icons.nextIcon}
                  <div id="left" onClick={() => actions.onActive(-1)}>
                    Prev
                  </div>
                  <div id="right" onClick={() => actions.onActive(1)}>
                    Next
                  </div>
                </>
              );
            },
            onChange,
          }}
        />,
      );

      // Origin Node
      fireEvent.click(document.querySelector('.rc-image-preview-actions-action-prev'));
      expect(onChange).toHaveBeenCalledWith(0, 1);
      fireEvent.click(document.querySelector('.rc-image-preview-actions-action-next'));
      expect(onChange).toHaveBeenCalledWith(2, 1);

      // Customize
      onChange.mockReset();
      fireEvent.click(document.getElementById('left'));
      expect(onChange).toHaveBeenCalledWith(0, 1);

      fireEvent.click(document.getElementById('right'));
      expect(onChange).toHaveBeenCalledWith(2, 1);
    });
  });

  it('onTransform should be triggered when transform change', () => {
    const onTransform = jest.fn();
    const { container } = render(
      <Image
        src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
        preview={{ onTransform }}
      />,
    );

    fireEvent.click(container.querySelector('.rc-image'));
    act(() => {
      jest.runAllTimers();
    });

    expect(document.querySelector('.rc-image-preview')).toBeTruthy();

    fireEvent.click(document.querySelector('.rc-image-preview-actions-action-flipY'));
    act(() => {
      jest.runAllTimers();
    });

    expect(onTransform).toHaveBeenCalledTimes(1);
    expect(onTransform).toHaveBeenCalledWith({
      transform: {
        flipY: true,
        flipX: false,
        rotate: 0,
        scale: 1,
        x: 0,
        y: 0,
      },
      action: 'flipY',
    });
  });

  it('imageRender', () => {
    const { container } = render(
      <Image
        src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
        preview={{
          imageRender: () => (
            <video
              width="100%"
              controls
              src="https://mdn.alipayobjects.com/huamei_iwk9zp/afts/file/A*uYT7SZwhJnUAAAAAAAAAAAAADgCCAQ"
            />
          ),
        }}
      />,
    );

    fireEvent.click(container.querySelector('.rc-image'));
    act(() => {
      jest.runAllTimers();
    });

    expect(document.querySelector('video')).toBeTruthy();
  });

  it('should be closed when press esc after click portal', () => {
    const onOpenChange = jest.fn();
    const afterOpenChange = jest.fn();
    const { container } = render(
      <Image
        src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
        preview={{
          onOpenChange,
          afterOpenChange,
        }}
      />,
    );

    fireEvent.click(container.querySelector('.rc-image'));
    act(() => {
      jest.runAllTimers();
    });

    expect(document.querySelector('.rc-image-preview')).toBeTruthy();

    expect(onOpenChange).toHaveBeenCalledWith(true);
    expect(afterOpenChange).toHaveBeenCalledWith(true);

    fireEvent.click(document.querySelector('.rc-image-preview-actions'));

    fireEvent.keyDown(window, { key: 'Escape', keyCode: 27 });

    expect(onOpenChange).toHaveBeenCalledWith(false);
    expect(afterOpenChange).toHaveBeenCalledWith(false);

    expect(onOpenChange).toHaveBeenCalledTimes(2);
    expect(afterOpenChange).toHaveBeenCalledTimes(2);
  });

  it('not modify preview image size', () => {
    render(
      <Image
        src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
        width={20}
        height={20}
        preview={{
          open: true,
        }}
      />,
    );

    act(() => {
      jest.runAllTimers();
    });

    const previewImg = document.querySelector('.rc-image-preview img');
    expect(previewImg).not.toHaveAttribute('width');
    expect(previewImg).not.toHaveAttribute('height');
  });
  it('support classnames and styles', () => {
    const customClassnames = {
      cover: 'custom-cover',
      popup: {
        mask: 'custom-mask',
        actions: 'custom-actions',
        root: 'custom-root',
      },
    };
    const customStyles = {
      cover: { color: 'red' },
      popup: {
        mask: { color: 'red' },
        actions: { backgroundColor: 'blue' },
        root: { border: '1px solid green' },
      },
    };
    const { baseElement } = render(
      <Image
        src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
        preview={{
          cover: 'Bamboo Is Light',
          zIndex: 9999,
          open: true,
        }}
        classNames={customClassnames}
        styles={customStyles}
      />,
    );

    const cover = document.querySelector('.rc-image-cover');
    const mask = document.querySelector('.rc-image-preview-mask');
    const actions = baseElement.querySelector('.rc-image-preview-actions');
    expect(cover).toHaveClass(customClassnames.cover);
    expect(cover).toHaveStyle(customStyles.cover);
    expect(mask).toHaveClass(customClassnames.popup.mask);
    expect(mask).toHaveStyle(customStyles.popup.mask);
    expect(actions).toHaveClass(customClassnames.popup.actions);
    expect(actions).toHaveStyle(customStyles.popup.actions);
    expect(baseElement.querySelector('.rc-image-preview')).toHaveClass(customClassnames.popup.root);
    expect(baseElement.querySelector('.rc-image-preview')).toHaveStyle(customStyles.popup.root);
  });
});

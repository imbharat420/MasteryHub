import { useEffect,useRef } from 'react';


/***
 * useMount: This Hook runs an effect only when the component mounts (i.e., when it is first rendered). It does this by passing an empty array as the second argument to useEffect, which tells React to only run the effect when the component mounts and not on subsequent updates.
*/

const useMount = (effect: () => void) => useEffect(effect, []);


/**
 * useMountRef: This Hook returns a mutable reference object that starts as true when the component mounts and becomes false when the component unmounts. It does this by using the useRef Hook to create a mutable reference object and the useMount Hook to update its value when the component mounts and unmounts.
*/
const useMountRef = () => {
  const mountRef = useRef(true);
  useMount(() => () => mountRef.current = false);
  return mountRef;
};



/**
 * useMountedRef: This Hook is similar to useMountRef, but it returns a reference object that starts as true when the component mounts and becomes false when the component unmounts.
*/
const useMountedRef = () => {
  const ref = useRef(true);
  useMount(() => () => ref.current = false);
  return ref;
};



/**
 * useUnMount: This Hook runs an effect when the component unmounts (i.e., when it is removed from the DOM). It does this by using the useMountRef Hook to get a reference object that is true when the component is mounted and false when it is unmounted, and then using the useEffect Hook to run the effect when the component unmounts. The effect is passed as the first argument to the Hook and the dependencies (if any) are passed as the second argument.
*/

const useUnMount = (effect: any, deps: any[] = []) => {
  const mountedRef = useMountRef();
  useEffect(() => () => {
    !mountedRef.current && effect();
  }, deps);
};

